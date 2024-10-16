import React, { type SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type Stripe } from '@stripe/stripe-js';
import { selectEventsData, setEventData } from '../../../core/store/events';
import { useDebounce } from '../../../core/hooks';
import { selectPaymentError } from '../../../core/store/checkout';
import { setShowError } from '../../../core/store/error';
import { selectShowCheckout } from '../../../core/store/plans';
import { CardForm } from '.';

interface StripeComponentProps {
  stripePromise?: Promise<Stripe | null>;
  stripeInstance?: any;
  card: any;
  expiration: any;
  cvc: any;
  cardholder?: any;
  setName: (value: string) => void;
  locale?: string;
  setIsFormValid?: (value: boolean) => void;
  // stripeFieldsStyle: typeof defaultFieldsStyles;
}

export const StripeCard = ({
  card,
  cvc,
  expiration,
  cardholder,
  setName,
  setIsFormValid,
}: StripeComponentProps) => {
  const [cardBrand, setCardBrand] = useState('');
  const [isCvv, setIsCvv] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [err, setErr] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const eventsData = useSelector(selectEventsData);
  const debouncedErr = useDebounce(err, 500);
  const debouncedValidity = useDebounce(isValid, 500);
  const showCheckout = useSelector(selectShowCheckout);
  const { show: showError } = useSelector(selectPaymentError);

  const fieldEventHandler = (evt: any, setValidity: React.Dispatch<SetStateAction<boolean>>) => {
    if (evt.error) {
      setErr(evt.error.message);
    }
    setValidity(evt.complete);
  };

  card.on('ready', () => {
    document.querySelectorAll('.__PrivateStripeElement-input').forEach((el) => {
      el.setAttribute('inputmode', 'numeric');
    });
    if (showCheckout && !showError) {
      card.focus();
    }
  });

  card.on('change', (event: any) => {
    if (event.brand && event.brand !== 'unknown' && event.brand !== cardBrand) {
      setCardBrand(event.brand);
    }
    if (event.empty) {
      setCardBrand('');
    }
    event.complete && expiration.focus();
    fieldEventHandler(event, setIsCard);
  });

  expiration.on('change', (event: any) => {
    event.complete && cvc.focus();
    fieldEventHandler(event, setIsExp);
  });

  cvc.on('change', (event: any) => {
    event.complete && cardholder?.current?.focus();
    fieldEventHandler(event, setIsCvv);
  });

  useEffect(() => {
    card.mount('#card-number-element');
    expiration.mount('#card-expiry-element');
    cvc.mount('#card-cvc-element');
  }, [card, cvc, expiration]);

  useEffect(() => {
    setIsValid(isCard && isExp && isCvv);
  }, [isCard, isExp, isCvv]);

  useEffect(() => {
    setIsFormValid?.(debouncedValidity);
  }, [debouncedValidity, setIsFormValid]);

  useEffect(() => {
    if (cardBrand && eventsData && eventsData.card_brand !== cardBrand) {
      const localEventData = {
        card_brand: cardBrand,
      };
      dispatch(setEventData(localEventData));
    }
  }, [cardBrand, eventsData, dispatch]);

  useEffect(() => {
    if (debouncedErr) {
      dispatch(setShowError(debouncedErr));
    }
  }, [debouncedErr, dispatch]);

  return (
    <CardForm {...{
      // card,
      // expiration,
      // cvc,
      cardholder,
      cardBrand,
      setName,
    }}/>
  );
};
