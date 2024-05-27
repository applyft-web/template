import amplitude from 'amplitude-js';
import { AMPLITUDE_KEY } from '../core/constants';

/*const amplitudeEventsList: string[] = [
  'paywall_page_show',
  'paywall_page_completed',
  'subs_purchase_show',
  'subs_purchase_started',
  'subs_purchase_completed',
  'subs_purchase_screen_close',
  'card_checkout_chosen',
  'payment_animation_screen',
  'subs_purchase_failed',
  'payment_declined_try_again',
  'success_page_show',
];*/

export const initAmplitude = (userId: string | undefined, callback: (key: string) => void) => {
  amplitude
    .getInstance()
    .init(AMPLITUDE_KEY, userId, {}, () => callback('amplitude'));
};

export const setAmplitudeUserId = (userId: string) => amplitude.getInstance().setUserId(userId);

export const sendAmplitudeData = (eventType: string, eventParams: any) => {
  // if (!amplitudeEventsList.includes(eventType)) return;
  const checkInit = setInterval(
    () => {
      if (window.sessionStorage.getItem('amplitudeInit') === 'true') {
        amplitude.getInstance().logEvent(eventType, eventParams);
        clearInterval(checkInit);
      }
    },
    500
  );
};

export const setAmplitudeUserProperties = (properties: object) => amplitude.getInstance().setUserProperties(properties);
