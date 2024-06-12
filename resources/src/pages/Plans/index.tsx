import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectPlan,
  selectPlanCoupon,
  setCouponDetails,
  setPlan,
  setPlanDetails,
  setShowCheckout,
} from '../../core/store/plans';
import { setEventData, selectEventsData, setAnalyticsData } from '../../core/store/events';
import { EVENTS } from '../../core/constants';
import { useAnalyticsData, useDelayedExecute } from '../../core/hooks';
import { PLANS, COUPONS, sendAnalyticsEvents } from '../../analytics';
import { ArabicContext } from '../../App';
import { PaymentIcons } from './components';
import { ReviewsBlock } from '../../components';
import { ContinueButton, PlansList, type PlanProps } from '@applyft-web/ui-components';
import * as S from './styled';

export const Plans = () => {
  const isArabic = useContext(ArabicContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const analyticsData = useAnalyticsData();
  const delayedExecute = useDelayedExecute();
  const activePlan = useSelector(selectPlan);
  const couponDetails = useSelector(selectPlanCoupon);
  const eventsData = useSelector(selectEventsData);
  const plans = useMemo(() => [
    {
      id: 'bb-monthly-intro7d-699-1499',
      duration: `1 ${t('week')}`,
      price: '0.99',
      oldPrice: '1.99',
      period: `${t('per_day')}`,
      fullPrice: '6.99',
      oldFullPrice: '14.99',
      currencySign: '$',
    },
    {
      id: 'bb-monthly-1499',
      duration: `1 ${t('month')}`,
      price: '0.36',
      oldPrice: '0.50',
      period: t('per_day'),
      fullPrice: '10.99',
      oldFullPrice: '14.99',
      currencySign: '$',
      coupon: 'discount_4_usd_off_onetime',
      label: t('most_popular'),
    },
    {
      id: 'bb-annual-3999',
      duration: `1 ${t('year')}`,
      price: '0.08',
      oldPrice: '0.11',
      period: t('per_day'),
      fullPrice: '29.99',
      oldFullPrice: '39.99',
      currencySign: '$',
      coupon: 'discount_10_usd_off_onetime',
    },
  ], [t]);
  const planDetails = useMemo(() => PLANS[activePlan], [activePlan]);
  const onPlanClick = useCallback((plan: PlanProps) => {
    const { id, coupon } = plan;
    const planDetails = PLANS[id];
    dispatch(setPlan(id));
    dispatch(setPlanDetails(planDetails));
    dispatch(
      setCouponDetails({
        price: coupon ? COUPONS[coupon] : 0,
        name: coupon || '',
      })
    );
  }, [dispatch]);
  const onContinueClick = () => {
    const { productId, duration, description, periodPrice, price, currency } = planDetails;
    const priceWithCoupon = (periodPrice - couponDetails.price).toFixed(2)
    const planData = {
      Value: price,
      value: Math.round(price * 100),
      currency: currency || "USD",
      price: periodPrice,
      Duration: duration,
      duration,
      description,
      periodPrice: priceWithCoupon,
      product_id: productId,
    };
    dispatch(setEventData(planData));
    sendAnalyticsEvents(EVENTS.PLAN_CHOSEN, {
      ...eventsData,
      ...planData,
    });
    delayedExecute(() => dispatch(setShowCheckout(true)));
  };

  useEffect(() => {
    dispatch(setAnalyticsData(analyticsData));
  }, [dispatch, analyticsData]);

  useEffect(() => {
    if (!activePlan) onPlanClick(plans[0]);
  }, [plans, onPlanClick, activePlan]);

  return (
    <>
      <PlansList
        plans={plans}
        activePlan={activePlan}
        onPlanClick={onPlanClick}
        isArabic={isArabic}
        mt={24}
      />
      <ContinueButton
        onClick={onContinueClick}
        staticPosition
        mt={16}
        customId={'paywall-continue-button-1'}
      />
      <S.Disclaimer>{t('disclaimer', { price: `${planDetails?.currencySymbol}${planDetails?.price}`, duration: planDetails?.duration})}</S.Disclaimer>
      <PaymentIcons />
      <ReviewsBlock staticMode shortList mt={16} />
    </>
  );
};
