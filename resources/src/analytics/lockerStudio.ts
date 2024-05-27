import amplitude from 'amplitude-js';
import { GISMART_KEY, LOCKER_STUDIO_DOMAIN } from '../core/constants';

export const initLockerStudio = (userId: string, callback: (key: string) => void) => {
  amplitude
    .getInstance('lockerStudio')
    .init(GISMART_KEY, userId, { apiEndpoint: LOCKER_STUDIO_DOMAIN }, () => callback('lockerStudio'));
};

export const sendLockerStudioData = (eventType: string, eventParams: any) => {
  const checkInit = setInterval(() => {
    if (window.sessionStorage.getItem('lockerStudioInit') === 'true') {
      amplitude.getInstance('lockerStudio').logEvent(eventType, eventParams);
      clearInterval(checkInit);
    }
  }, 500);
};
