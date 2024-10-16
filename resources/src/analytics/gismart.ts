import amplitude from 'amplitude-js';
import {
  GISMART_KEY,
  GISMART_DOMAIN,
  GISMART_AUTH_TOKEN,
  GISMART_INIT_EVENT,
} from '../core/constants';

export const initGismart = (userId: string, callback: (key: string) => void) => {
  const config = {
    apiEndpoint: GISMART_DOMAIN,
    headers: {
      Authorization: `Bearer ${GISMART_AUTH_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    forceHttps: true,
  };
  const callbackFunction = () => {
    callback('gismart');
    sendInitGismartEvent(userId);
  };

  amplitude
    .getInstance('gismart')
    .init(GISMART_KEY, userId, config, callbackFunction);
};

export const sendGismartData = (eventType: string, eventParams: any) => {
  const checkInit = setInterval(
    () => {
      if (window.sessionStorage.getItem('gismartInit') === 'true') {
        amplitude.getInstance('gismart').logEvent(eventType, eventParams);
        clearInterval(checkInit);
      }
    },
    500
  );
};

const sendInitGismartEvent = (userId: string) => {
  const eventData = {
    gia_id: GISMART_KEY,
    public_id: userId,
  };
  sendGismartData(GISMART_INIT_EVENT, eventData);
};