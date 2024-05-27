import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { setEventData } from './events';
import { setShowLoader } from './loader';
import { setShowError } from './error';
import { sendAnalyticsEvents } from '../../analytics';
import { EVENTS } from '../constants';
import {
  type Stripe as StripeType,
  type StripeCardNumberElement,
  type ConfirmCardPaymentData,
} from '@stripe/stripe-js';
import {
  getPollingID,
  getSubscriptionID,
  sendStripeReq,
  subscribeToPriceChange,
} from './checkoutFetch';

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    cardholderName: '',
    isSuccess: null,
    stripeNonce: '',
    braintreeNonce: '',
    id: null,
    paymentError: {
      show: false,
      message: '',
    },
    isCardFormShown: false,
  },
  reducers: {
    setCardholderName: (state, action) => {
      state.cardholderName = action.payload;
    },
    setRequestResult: (state, action) => {
      const { isSuccess, id } = action.payload;

      state.isSuccess = isSuccess;
      state.id = id;
    },
    setShowPaymentError: (state, action) => {
      const show: boolean | string = action.payload;
      if (typeof show === 'string') {
        state.paymentError = {
          show: true,
          message: show,
        };
      } else {
        state.paymentError = {
          show: show,
          message: '',
        };
      }
    },
    setIfCardFormShown: (state, action) => {
      state.isCardFormShown = action.payload;
    },
    setStripeNonce: (state, action) => {
      state.stripeNonce = action.payload;
    },
    setBraintreeNonce: (state, action) => {
      state.braintreeNonce = action.payload;
    },
  },
});

export const {
  setCardholderName,
  setStripeNonce,
  setBraintreeNonce,
  setRequestResult,
  setShowPaymentError,
  setIfCardFormShown,
} = checkoutSlice.actions;

interface StripePurchaseProps {
  paymentMethodObj: {
    methodName: string,
    stripeNonce: string,
  } | null;
  stripe: StripeType;
  card: StripeCardNumberElement;
  name?: string;
  plan: string;
  token: string;
  analyticsParams: any;
  eventsData: any;
  eventId: string;
  successPayment?: () => void;
  failedPayment?: () => void;
  coupon?: string;
}

interface ServerRequestProps {
  paymentMethodObj: {
    methodName?: string,
    stripeNonce: string,
  };
  stripe: StripeType;
  plan: string;
  token: string;
  analyticsParams: any;
  eventsData: any;
  eventId: string;
  onSuccess?: any;
  onError?: any;
  upsell?: boolean;
  payment_intent_id?: string;
  coupon?: string;
}

const sendServerRequest = async ({
  stripe,
  paymentMethodObj,
  plan,
  token,
  analyticsParams,
  eventsData,
  onError,
  onSuccess,
  eventId,
  upsell = false,
  payment_intent_id = '',
  coupon = '',
}: ServerRequestProps) => {
  const { stripeNonce, methodName } = paymentMethodObj;
  const pollingID = await getPollingID(
    stripeNonce,
    plan,
    token,
    analyticsParams,
    eventsData,
    onError,
    eventId,
    upsell,
    payment_intent_id,
    coupon
  );
  if (pollingID) {
    const purchaseRequest = await subscribeToPriceChange(pollingID);
    const {status, errors, data} = purchaseRequest || {
      errors: {messages: 'Unknown error. Please try again'},
    };

    if (status) {
      if (status === 'requires_action' && data && data.payment_intent_secret) {
        const cardPaymentSecret = data.payment_intent_secret;
        const cardPaymentData: ConfirmCardPaymentData = methodName
          ? {payment_method: stripeNonce}
          : {setup_future_usage: 'off_session'};
        const cardPaymentOptions = methodName ? {handleActions: false} : {};

        const {error: errorAction, paymentIntent} =
          await stripe.confirmCardPayment(
            cardPaymentSecret,
            cardPaymentData,
            cardPaymentOptions
          );

        if (errorAction) {
          if (methodName) {
            onError(errorAction.message, data);
          } else {
            await sendServerRequest({
              stripe,
              paymentMethodObj,
              plan,
              token,
              analyticsParams,
              eventsData,
              onError,
              onSuccess,
              eventId,
              upsell,
              payment_intent_id: data.payment_intent_id,
              coupon
            });
          }
          return;
        }
        if (methodName) {
          if (paymentIntent.status === 'requires_action') {
            const {error} = await stripe.confirmCardPayment(
              data.payment_intent_secret
            );
            if (error) {
              onError(error, data);
              return;
            }
          }
        }

        await sendServerRequest({
          stripe,
          paymentMethodObj,
          plan,
          token,
          analyticsParams,
          eventsData,
          onError,
          onSuccess,
          eventId,
          upsell,
          payment_intent_id: paymentIntent.id,
          coupon,
        });
      } else {
        const {subscription_id} = data || {subscription_id: ''};

        return onSuccess(subscription_id);
      }
    }

    if (errors) {
      if (status === 'requires_action') return;
      onError(errors?.messages || 'An error has occurred', data);
    }
  }
};

export const stripePurchase = ({
  paymentMethodObj = null,
  stripe,
  card,
  name = '',
  plan,
  token,
  analyticsParams,
  eventsData,
  eventId,
  successPayment,
  failedPayment,
  coupon,
}: StripePurchaseProps) =>
  async (dispatch: Dispatch) => {
    const onError = (data: any, errorData: any) => {
      failedPayment?.();

      let txt = data;
      if (typeof txt !== 'string') txt = data?.message;
      if (typeof txt !== 'string') txt = 'Payment error';

      dispatch(
        setEventData({
          declineCode: errorData?.decline_code || errorData?.processor_response,
        })
      );
      sendAnalyticsEvents(EVENTS.PAYMENT_DECLINE, {
        ...eventsData,
        declineCode: errorData?.decline_code || errorData?.processor_response,
      });
      dispatch(setShowPaymentError(txt));
    };
    const onSuccess = (id: string = '') => {
      successPayment?.();
      dispatch(
        setRequestResult({
          isSuccess: true,
          id,
        })
      );
      sendAnalyticsEvents(EVENTS.SUBSCRIBED, eventsData);
    };
    const sendReq = (obj: any) => sendServerRequest({
      stripe,
      paymentMethodObj: obj,
      plan,
      token,
      analyticsParams,
      eventsData,
      onError,
      onSuccess,
      eventId,
      upsell: false,
      payment_intent_id: '',
      coupon
    });

    dispatch(setShowLoader(true));
    sendAnalyticsEvents(EVENTS.PAYMENT_ANIMATION, eventsData);

    try {
      if (paymentMethodObj) {
        dispatch(setStripeNonce(paymentMethodObj.stripeNonce));
        await sendReq(paymentMethodObj);
      } else {
        const { paymentMethod, error } = await sendStripeReq(stripe, card, name);
        const stripeNonce = paymentMethod?.id || error?.code;

        if (error) {
          console.error(error.message);
          dispatch(setShowError(error.message));
        } else {
          dispatch(setStripeNonce(stripeNonce));
          await sendReq({ stripeNonce });
        }
      }
    } finally {
      dispatch(setShowLoader(false));
    }
  };

/*export const sendUpsellPurchaseRequest =
  (
    stripeNonce,
    plan,
    token,
    analyticsParams,
    eventsData,
    eventId,
    onSuccessEvents
  ) =>
  async (dispatch) => {
    function onError() {
      console.log(arguments);
    }
    function onSuccess() {
      if (onSuccessEvents) onSuccessEvents(arguments);
      // console.log(arguments);
    }

    dispatch(setCheckoutLoader({ show: true, type: 'checkout' }));

    try {
      await sendServerReq(
        null,
        { stripeNonce },
        plan,
        token,
        analyticsParams,
        eventsData,
        onError,
        onSuccess,
        eventId,
        true,
        '',
        ''
      );
    } finally {
      dispatch(setCheckoutLoader({ show: false, type: '' }));
    }
  };*/

interface BraintreePurchaseProps {
  nonce: string;
  binData?: any;
  threeDSInstance?: any;
  plan: string;
  token: string;
  userUuid: string;
  analyticsParams: any;
  eventsData: any;
  coupon?: string;
}

export const braintreePurchase = ({
  nonce,
  binData,
  threeDSInstance,
  plan,
  token,
  analyticsParams,
  eventsData,
  userUuid,
  coupon,
}: BraintreePurchaseProps) =>
  async (dispatch: Dispatch) => {
    dispatch(setBraintreeNonce(nonce));

    const onError = (data: any, errorData?: any) => {
      let txt = data;
      if (typeof txt !== 'string') txt = data.message;
      if (typeof txt !== 'string') txt = 'Payment error';

      dispatch(
        setEventData({
          id: 'decline_code',
          data: errorData?.decline_code || errorData?.processor_response,
        })
      );
      sendAnalyticsEvents(EVENTS.PAYMENT_DECLINE, {
        ...eventsData,
        declineCode: errorData?.decline_code || errorData?.processor_response,
      });
      dispatch(setShowPaymentError(txt));
      dispatch(setShowLoader(false));
    };
    const onSuccess = ({ customer_id, subscription_id }: { customer_id: string;  subscription_id: string; }) => {
      const localData = {
        customer_id,
        subscription_id,
        plan_id: plan,
      };
      dispatch(setRequestResult({ isSuccess: true, id: subscription_id }));
      dispatch(setEventData(localData));
      sendAnalyticsEvents(EVENTS.SUBSCRIBED, { ...eventsData, ...localData });
      dispatch(setShowLoader(false));
    };

    const purchaseRequest = await getSubscriptionID(
      nonce,
      plan,
      token,
      analyticsParams,
      eventsData,
      userUuid,
      coupon
    );

    try {
      const { errors, data } = purchaseRequest;
      if (errors) {
        if (errors?.messages === 'User action required') {
          const { payment_method_nonce, validation_amount } = data;
          dispatch(setBraintreeNonce(payment_method_nonce));

          threeDSInstance.verifyCard(
            {
              nonce: payment_method_nonce,
              bin: binData,
              amount: validation_amount,
            },
            (verifyError: any, payload: any) => {
              if (verifyError) {
                console.error('verify error: ', verifyError);
                onError(verifyError, data);
                return;
              }
              // console.log('verify: ', payload);

              braintreePurchase({
                nonce: payload.nonce,
                binData,
                threeDSInstance,
                plan,
                token,
                analyticsParams,
                eventsData,
                userUuid
              })(dispatch);
            }
          );
          return;
        }

        onError(errors?.messages || 'An error has occurred', data);
        return;
      }
      onSuccess(data);
    } catch (err) {
      onError(err);
    }
  };

/*export const sendUpsellBraintreePurchase =
  (
    braintreeNonce,
    plan,
    token,
    analyticsParams,
    eventsData,
    userUuid,
    onSuccessFunc,
    onErrorFunc
  ) =>
  async (dispatch) => {
    function onError() {
      console.log(arguments);
      if (onErrorFunc) onErrorFunc();
    }

    function onSuccess() {
      console.log(arguments);
      if (onSuccessFunc) onSuccessFunc(arguments[0]);
    }

    dispatch(setCheckoutLoader({ show: true, type: 'checkout' }));

    try {
      await getSubscriptionID(
        braintreeNonce,
        plan,
        token,
        analyticsParams,
        eventsData,
        userUuid,
        onSuccess,
        onError
      );
    } finally {
      dispatch(setCheckoutLoader({ show: false, type: '' }));
    }
  };*/

export const selectCardholderName = (state: any) => state.checkout.cardholderName;
export const selectSuccess = (state: any) => state.checkout.isSuccess;
export const selectID = (state: any) => state.checkout.id;
export const selectPaymentError = (state: any) => state.checkout.paymentError;
export const selectIfCardFormShown = (state: any) => state.checkout.isCardFormShown;
export const selectStripeNonce = (state: any) => state.checkout.stripeNonce;
export const selectBraintreeNonce = (state: any) => state.checkout.braintreeNonce;

export default checkoutSlice.reducer;

