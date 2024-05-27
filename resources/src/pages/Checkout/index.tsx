import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PaymentRequestButtonElement, Elements } from '@stripe/react-stripe-js';
import {
  loadStripe,
  type Stripe as StripeType,
  type StripeCardNumberElement,
  type StripeCardExpiryElement,
  type StripeCardCvcElement,
  type PaymentRequest,
  type PaymentRequestPaymentMethodEvent,
} from '@stripe/stripe-js';
import { sendPurchaseEvent, setAmplitudeUserProperties } from '../../analytics';
import { EVENTS, PRODUCT_NAME } from '../../core/constants';
import {
  selectEventsData,
  selectAnalyticsData,
  setEventData,
} from '../../core/store/events';
import {
  stripePurchase,
  selectID,
  selectPaymentError,
  selectSuccess,
  selectIfCardFormShown,
  setIfCardFormShown,
  setCardholderName,
} from '../../core/store/checkout';
import {
  selectToken,
  selectUuid,
  selectStripe,
  selectPaymentProvider,
} from '../../core/store/signup';
import {
  selectPlan,
  selectShowCheckout,
  selectPlanDetails,
  selectPlanCoupon,
  setShowCheckout,
} from '../../core/store/plans';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../core/hooks';
import { StripeCard } from './components/Stripe';
import ErrorScreen from './components/ErrorScreen';
import PlanInfoBlock from './components/PlanInfoBlock';
import { ContinueButton } from '@applyft-web/ui-components';
import * as S from './styled';

const textAlign = navigator.language.startsWith('ar') ? 'right' : 'left';

const stripeFieldsStyle = {
  base: {
    color: '#fff',
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 300,
    fontFamily: 'Open Sans, sans-serif',
    textAlign,

    '::placeholder': {
      color: '#8696A6',
      letterSpacing: '1.2px',
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
};

export const Checkout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const paymentError = useSelector(selectPaymentError);
  const eventsData = useSelector(selectEventsData);
  const planDetails = useSelector(selectPlanDetails);
  const couponDetails = useSelector(selectPlanCoupon);
  const isSuccess = useSelector(selectSuccess);
  const subscriptionId = useSelector(selectID);
  const userUuid = useSelector(selectUuid);
  const token = useSelector(selectToken);
  const plan = useSelector(selectPlan);
  const analyticsParams = useSelector(selectAnalyticsData);
  const showCheckout = useSelector(selectShowCheckout);
  const cardFormVisited = useSelector(selectIfCardFormShown);
  const paymentProvider = useSelector(selectPaymentProvider);
  const { show: showError } = useSelector(selectPaymentError);
  const { key: stripePk, name: stripeAccountName } = useSelector(selectStripe);
  const card = useRef<StripeCardNumberElement | null>(null);
  const expiration = useRef<StripeCardExpiryElement | null>(null);
  const cvc = useRef<StripeCardCvcElement | null>(null);
  const cardholder = useRef<HTMLInputElement | null>(null);
  const [load, setLoad] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [stripeInstance, setStripeInstance] = useState<StripeType | null>(null);
  const [stripePromise, setStripePromise ] = useState<Promise<StripeType | null> | null>(null);
  const [activeTab, setActiveTab] = useState('card');
  const [wallet, setWallet] = useState<string | null>(null);
  const cardPlaceholder = '0000 0000 0000 0000';
  const expirationPlaceholder = 'MM/YY';
  const cvcPlaceholder = 'CVV';
  const CARD_BRANDS = ['visa', 'mastercard', 'maestro', 'discover'];
  const isBraintree = paymentProvider === 'braintree';
  const isOnlyCardMethod = !wallet;

  const renderBrand = (card: string) => {
    if (!card || !CARD_BRANDS.includes(card)) return null;
    return (
      <img
        key={card}
        src={`./assets/images/card-brands/${card}.png`}
        alt={card}
        width={19}
        height={12}
      />
    );
  };

  const stripePurchaseClick = useCallback((
    paymentMethod: PaymentRequestPaymentMethodEvent | null,
    successPayment?: () => void,
    failedPayment?: () => void,
  ) => {
    if (stripeInstance && card.current) {
      const paymentMethodName = paymentMethod?.walletName ?? 'Stripe';
      const paymentCardBrandName = eventsData.cardBrand ?? 'unknown';
      // TODO check card prop
      // paymentMethod?.card?.brand ?? eventsData.cardBrand ?? 'unknown';
      const paymentMethodObj = paymentMethod
        ? {
          methodName: paymentMethodName,
          stripeNonce: paymentMethod.paymentMethod.id,
        }
        : null;
      const localEventsData = {
        payment_method: paymentMethodName,
        cardBrand: paymentCardBrandName,
        card_brand: paymentCardBrandName,
        stripe_account_name: stripeAccountName,
      };
      const extendedEventsData = {
        ...eventsData,
        ...localEventsData,
      };
      setAmplitudeUserProperties({
        'Payments gateways': `Stripe [${stripeAccountName}]`,
      });
      dispatch(
        setEventData({
          'Payments gateways': `Stripe [${stripeAccountName}]`,
        })
      );
      dispatch(setEventData(localEventsData));
      sendEvents(EVENTS.BUY_SUBSCRIPTION_TAPPED, localEventsData);
      window?.ttq?.track('SubmitForm', {});

      stripePurchase({
        paymentMethodObj,
        stripe: stripeInstance,
        card: card.current,
        name: cardholder.current?.value,
        plan,
        token,
        analyticsParams,
        eventsData: extendedEventsData,
        eventId: userUuid,
        successPayment,
        failedPayment,
        coupon: couponDetails?.name,
      })(dispatch);
    }
  }, [
    dispatch,
    eventsData,
    plan,
    token,
    userUuid,
    analyticsParams,
    stripeInstance,
    stripeAccountName,
    sendEvents,
    couponDetails,
  ]);

  const onBackClick = () => {
    sendEvents(EVENTS.PAYWALL_CLOSED);
    dispatch(setShowCheckout(false));
    clearFields();
  };

  const clearFields = () => {
    if (
      !(
        card?.current &&
        expiration?.current &&
        cvc?.current &&
        cardholder?.current
      )
    )
      return;
    cardholder.current.value = '';

    const fieldsToClear = [card.current, expiration.current, cvc.current];
    fieldsToClear.forEach((field) => {
        if (!(field instanceof HTMLInputElement)) field.clear();
      });
  };

  usePreloadNextPage(nextPage);

  useEffect(() => {
    if (stripePk) {
      setStripePromise(loadStripe(stripePk, { locale: 'en' }));
    }
  }, [stripePk]);

  useEffect(() => {
    if (stripePromise) {
      stripePromise.then((stripeObj) => {
        if (!stripeObj) return;
        const elements = stripeObj.elements();

        card.current = elements.create('cardNumber', {
          style: stripeFieldsStyle,
          placeholder: cardPlaceholder,
        });
        expiration.current = elements.create('cardExpiry', {
          style: stripeFieldsStyle,
          placeholder: expirationPlaceholder,
        });
        cvc.current = elements.create('cardCvc', {
          style: stripeFieldsStyle,
          placeholder: cvcPlaceholder,
        });

        setStripeInstance(stripeObj);
        setLoad(true);
      });
    }
  }, [stripePromise]);

  useLayoutEffect(() => {
    if (stripeInstance && planDetails) {
      setPaymentRequest(null);
      try {
        const label = `${PRODUCT_NAME} ${planDetails.description} plan`;
        const amount = +(planDetails.periodPrice - (couponDetails?.price ?? 0)).toFixed(2) * 100;
        const pr = stripeInstance.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {label, amount},
          displayItems: [{label, amount}],
          requestPayerName: true,
          requestPayerEmail: true,
        });

        pr.canMakePayment().then((result: any) => {
          if (result && cardFormVisited) {
            const wallet = Object.keys(result).find((key) => (['applePay', 'googlePay'].includes(key) && result[key]));
            if (wallet) setWallet(wallet);
            setPaymentRequest(pr);
          }
        });

        pr.on('paymentmethod', async (e: any) => {
          const successPayment = () => e.complete('success');
          const failedPayment = () => e.complete('fail');

          stripePurchaseClick(e, successPayment, failedPayment);
        });
      } catch (e) {
        console.error('Error while creating payment request:', e);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeInstance, planDetails, couponDetails, cardFormVisited]);

  useEffect(() => {
    if (load && showCheckout && !paymentError.show) {
      dispatch(setIfCardFormShown(true));
      window?.ttq?.track('InitiateCheckout', { content_id: plan });
    }
  }, [load, showCheckout, paymentError, dispatch, plan]);

  useEffect(() => {
    if (isSuccess) {
      const { name, periodPrice, currency } = planDetails;
      const finalPrice = +(periodPrice - couponDetails?.price).toFixed(2);
      const { fbclid, gclid, ttclid } = eventsData;

      sendPurchaseEvent({
        price: finalPrice,
        currency,
        plan: name,
        subscriptionId,
        uuid: userUuid,
        gclid,
        pixelName: fbclid ? 'fb' : ttclid ? 'ttq' : '',
      });
      navigate(nextPage);
    }
  }, [navigate, isSuccess, planDetails, couponDetails, subscriptionId, userUuid, eventsData, nextPage]);

  return (
    <div className={'scrollable'}>
      <S.BackButton onClick={onBackClick} id='come-back-button'>
        <svg className={'cross-icon'} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.27817 7.15685L13.8744 2.56066C14.4602 1.97487 14.4602 1.02513 13.8744 0.43934C13.2886 -0.146447 12.3388 -0.146447 11.753 0.43934L7.15685 5.03553L2.56066 0.43934C1.97487 -0.146447 1.02513 -0.146447 0.43934 0.43934C-0.146447 1.02513 -0.146447 1.97487 0.43934 2.56066L5.03553 7.15685L0.43934 11.753C-0.146447 12.3388 -0.146447 13.2886 0.43934 13.8744C1.02513 14.4602 1.97487 14.4602 2.56066 13.8744L7.15685 9.27817L11.753 13.8744C12.3388 14.4602 13.2886 14.4602 13.8744 13.8744C14.4602 13.2886 14.4602 12.3388 13.8744 11.753L9.27817 7.15685Z" fill="#8A8FB2"/>
        </svg>
      </S.BackButton>
      <S.Title>{t(isOnlyCardMethod ? 'checkout' : 'select_payment_method')}</S.Title>
      {!isOnlyCardMethod && (
        <S.Tabs>
          <S.TabItem onClick={() => setActiveTab('card')} $isActive={activeTab === 'card'}>
            {t('credit_card')}
            <S.CardIconsList $mb={16}>{CARD_BRANDS.map(renderBrand)}</S.CardIconsList>
          </S.TabItem>
          {paymentRequest && wallet && (
            <S.TabItem onClick={() => setActiveTab('wallet')} $isActive={activeTab === 'wallet'}>
              <S.WalletIcon $img={wallet} />
            </S.TabItem>
          )}
        </S.Tabs>
      )}
      <PlanInfoBlock {...{planDetails, couponDetails}} />
      <S.PaymentBlock $show={activeTab === 'card'}>
        {
          load && (
            <StripeCard
              card={card.current}
              expiration={expiration.current}
              cvc={cvc.current}
              cardholder={cardholder}
              setIsFormValid={setIsFormValid}
              setName={(value: string) => dispatch(setCardholderName(value))}
            />
          )
        }
        <ContinueButton
          disabled={!isFormValid}
          onClick={() => stripePurchaseClick(null)}
          staticPosition
          customStyles={'color:#292C44;'}
          mt={24}
          customId={`${isBraintree ? 'braintree' : 'stripe'}-continue-button`}
        />
      </S.PaymentBlock>
      <S.PaymentBlock $show={activeTab === 'wallet'}>
        {cardFormVisited && paymentRequest && (
          <>
            <Elements stripe={stripePromise}>
              <S.PaymentRequestContainer>
                <PaymentRequestButtonElement
                  id='apple-google-pay-button'
                  options={{
                    paymentRequest,
                    style: {
                      paymentRequestButton: {
                        height: '56px',
                        theme: 'light',
                        type: 'default',
                      },
                    },
                  }}
                />
              </S.PaymentRequestContainer>
            </Elements>
          </>
        )}
      </S.PaymentBlock>
      {showError && <ErrorScreen clearFields={clearFields} />}
    </div>
  );
};
