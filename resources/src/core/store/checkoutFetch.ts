import { API_URL } from '../constants';
import { type Stripe as StripeType, type StripeCardNumberElement } from '@stripe/stripe-js';

export const sendStripeReq = async (
  stripe: StripeType,
  card: StripeCardNumberElement,
  name: string
): Promise<any> => {
  try {
    return await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name,
      },
    });
  } catch (e) {
    return e;
  }
};

interface ResponseDataProps {
  payment_intent_secret?: string;
  payment_intent_id?: string;
  subscription_id?: string;
}

export const subscribeToPriceChange = async (
  pollingId: string
): Promise<{ status?: string, errors?: { messages: string }, data?: ResponseDataProps }> => {
  const url = `${API_URL}/polling/get-result/${pollingId}`;

  try {
    const responseData = await fetch(url, { method: 'GET' });
    const response = await responseData.json();
    const { data, errors } = response;

    if (responseData.status === 202) {
      return await subscribeToPriceChange(pollingId);
    }

    if (data) {
      return {
        ...data.result_data,
        data: {
          ...data.result_data.data,
          subscription_id: data.result_data.subscription_id,
        }
      };
    } else {
      return { errors };
    }
  } catch (e) {
    console.error(e);
    return { errors: { messages: 'An error has occurred (look at console)' } };
  }
};

export const getPollingID = async (
  nonce: string,
  plan: string,
  token: string,
  analyticsParams: {
    user_data: object,
    [key: string]: string | object,
  },
  eventsData: object,
  onErrorHandler: (message: string) => void,
  userUuid: string,
  upsell: boolean,
  payment_intent_id: string,
  coupon: string = ''
) => {
  const url = `${API_URL}/users/me/subscriptions/polling/${plan}`;
  const requestData = {
    ...analyticsParams,
    user_data: {
      ...analyticsParams['user_data'],
      ...eventsData,
    }
  };
  const body = {
    gateway: 'stripe',
    payment_method_nonce: nonce,
    coupon,
    fb_event_id: `${userUuid}_${upsell ? 'upsell' : 'purchase'}`,
    tt_event_id: `${userUuid}_${upsell ? 'upsell' : 'purchase'}`,
    payment_intent_id,
    ...requestData,
  };

  try {
    const responseData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const response = await responseData.json();
    const { data, errors } = response;

    if (data) {
      return data.polling_result_id;
    } else if (errors) {
      onErrorHandler(errors.messages);
      return;
    }
  } catch (e) {
    console.error(e);
    onErrorHandler('An error has occurred (look at console)');
  }
};

export const getSubscriptionID = async (
  nonce: string,
  plan: string,
  token: string,
  analyticsParams: {
    user_data: object,
    [key: string]: string | object,
  },
  eventsData: object,
  userUuid: string,
  coupon: string = ''
) => {
  const url = `${API_URL}/users/me/subscriptions/${plan}`;
  const requestData = {
    ...analyticsParams,
    user_data: {
      ...analyticsParams['user_data'],
      ...eventsData,
    },
  };

  const body = {
    gateway: 'braintree',
    payment_method_nonce: nonce,
    coupon,
    fb_event_id: userUuid,
    tt_event_id: userUuid,
    ...requestData,
  };

  try {
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await results.json();
  } catch (e) {
    console.error(e);
    return { errors: { messages: 'An error has occurred (look at console)' } };
  }
};