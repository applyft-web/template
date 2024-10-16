import { sendAFEvent, setAFCustomerId } from './appsflyer';
import { sendAmplitudeData, setAmplitudeUserId } from './amplitude';
import { sendGismartData } from './gismart';
import { sendLockerStudioData } from './lockerStudio';
import {
  ENV,
  GOOGLE_MEASUREMENT_ID,
  /*GOOGLE_ADS_ID,
  GOOGLE_ADS_CONVERSION_ID,*/
} from '../core/constants';
import ReactGA from 'react-ga4';

const isDev = ENV === 'development';

export const sendAnalyticsEvents = (eventName: string, eventParams: any) => {
  sendAFEvent(eventName, eventParams);
  sendAmplitudeData(eventName, eventParams);
  sendGismartData(eventName, eventParams);
  sendLockerStudioData(eventName, eventParams);
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
  customEventId?: string;
}

export const sendPurchaseEvent = ({
  price,
  currency,
  plan,
  subscriptionId,
  uuid,
  gclid,
  pixelName,
  customEventId,
}: PurchaseEventProps) => {
  if (pixelName === 'fb') {
    pushFBEvent(
      {
        currency: currency || 'USD',
        itemCount: 1,
        transactionId: subscriptionId,
        price: price,
        value: price,
      },
      customEventId || `${uuid}_purchase`
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
      
      send_to: GOOGLE_MEASUREMENT_ID,
    });
    /*ReactGA.event('conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_ID}`,
      value: price,
      currency: currency || 'USD',
      transaction_id: subscriptionId,
    });*/
  }
};

export const setAnalyticsUserId = (userId: string) => {
  setAmplitudeUserId(userId);
  setAFCustomerId(userId);
};

export const pushGoogleTag = (eventName: string, eventParams: any, tagId = GOOGLE_MEASUREMENT_ID) => {
  if (isDev) return;
  ReactGA.event(eventName, { ...eventParams, send_to: tagId });
};

export const pushFBEvent = (data: any, eventId: string) => {
  window.fbq?.('track', 'Purchase'+(isDev ? '_test' : ''), data, { eventID: eventId });
};
