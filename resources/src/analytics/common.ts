// import { sendAFEvent, setAFCustomerId } from './appsflyer';
import { sendAmplitudeData, setAmplitudeUserId } from './amplitude';
import { sendGismartData, GISMART_EVENTS } from './gismart';
import { sendLockerStudioData } from './lockerStudio';
import { ENV } from '../core/constants';
import ReactGA from 'react-ga4';

const isDev = ENV === 'development';

export const sendAnalyticsEvents = (eventName: string, eventParams: any) => {
  const gismartEventName = GISMART_EVENTS[eventName];

  // sendAFEvent(eventName, eventParams);
  sendAmplitudeData(eventName, eventParams);
  sendGismartData(gismartEventName ?? eventName, eventParams);
  sendLockerStudioData(gismartEventName ?? eventName, eventParams);
  pushGoogleTag(eventName, eventParams);
};

interface PurchaseEventProps {
  price: number;
  currency?: string;
  plan: string;
  subscriptionId: string;
  uuid: string;
  gclid?: string;
  pixelName: string;
}

export const sendPurchaseEvent = (props: PurchaseEventProps) => {
  const { price, currency, plan, subscriptionId, uuid, gclid, pixelName } = props;

  if (pixelName === 'fb') {
    pushFBEvent(
      {
        currency: currency || 'USD',
        itemCount: 1,
        transactionId: subscriptionId,
        price: price,
        value: price,
      },
      `${uuid}_purchase`
    );
  } else if ('ttq') {
    window?.ttq?.track('CompletePayment', {
      value: price,
      currency: currency || 'USD',
      contents: [
        {
          content_type: 'product',
          content_name: plan,
        },
      ],
      event_id: `${uuid}_purchase`,
    });
  }

  if (!isDev) {
    ReactGA.event('purchase', {
      currency: currency || 'USD',
      value: price,
      transaction_id: subscriptionId,
      gclid,
      items: {
        item_id: plan,
        item_name: plan,
      },
    });
  }
};

export const setAnalyticsUserId = (userId: string) => {
  setAmplitudeUserId(userId);
  // setAFCustomerId(userId);
};

export const pushGoogleTag = (eventName: string, eventParams: any) => {
  if (isDev) return;
  window.gtag?.('event', eventName, eventParams);
};

export const pushFBEvent = (data: any, eventId: string) => {
  window.fbq?.('track', 'Purchase'+(isDev ? '_test' : ''), data, {eventID: eventId});
};
