import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowCheckout, setShowCheckout } from '../../core/store/plans';
import { setDeepLinkUrl } from '../../core/store/signup';
import { useGenerateDeepLink, useSendEvents } from '../../core/hooks';
import { EVENTS as E } from '../../core/constants';
import { Plans } from '../Plans';
import { Checkout } from '../Checkout';
import { MainLayout } from '@applyft-web/ui-components';
import * as S from './styled';

const PlansCheckout = (props: any) => {
  const dispatch = useDispatch();
  const showCheckout = useSelector(selectShowCheckout);
  const sendEvents = useSendEvents();
  const url = useGenerateDeepLink();
  const [plansEventSent, setPlansEventStatus] = useState(false);
  const [checkoutEventSent, setCheckoutEventStatus] = useState(false);
  const closeCheckout = () => {
    if (showCheckout) dispatch(setShowCheckout(false));
  };

  useEffect(() => {
    if (showCheckout && !checkoutEventSent) {
      sendEvents(E.CHECKOUT_SHOWN);
      setCheckoutEventStatus(true);
      setPlansEventStatus(false);
      document.body.style.overflow = 'hidden';
    } else if (!showCheckout && !plansEventSent) {
      sendEvents(E.PAYWALL_SHOWN);
      setCheckoutEventStatus(false);
      setPlansEventStatus(true);
      document.body.style.overflow = 'initial';
    }
  }, [showCheckout, sendEvents, plansEventSent, checkoutEventSent]);
  
  useEffect(() => {
    dispatch(setDeepLinkUrl(url));
  }, [url, dispatch]);

  return (
    <S.Container>
      {props.popupStyle ? (
        <>
          <S.PlanContainer $showCheckout={showCheckout} onClick={closeCheckout} $isPopup={true}>
            <Plans />
          </S.PlanContainer>
          <S.CheckoutContainer $showCheckout={showCheckout} $isPopup={true}>
            <MainLayout>
              <Checkout {...props} />
            </MainLayout>
          </S.CheckoutContainer>
        </>
      ) : (
        <>
          <S.PlanContainer $showCheckout={showCheckout}>
            <Plans />
          </S.PlanContainer>
          <S.CheckoutContainer $showCheckout={showCheckout}>
            <Checkout {...props} />
          </S.CheckoutContainer>
        </>
      )}
    </S.Container>
  );
};

export default PlansCheckout;
