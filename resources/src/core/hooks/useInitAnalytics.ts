import { useEffect } from 'react';
import Cookies from 'js-cookie';
import FacebookPixel from 'react-facebook-pixel';
import GA4 from 'react-ga4';
import { initAmplitude, initGismart, initLockerStudio } from '../../analytics';
import { COOKIE_UUID_KEY, FB_PIXEL_ID, GOOGLE_MEASUREMENT_ID } from '../constants';
import { useInlineScript } from './useInlineScript';
import { tiktok } from '../scripts';
import { queryParser } from '@applyft-web/utils';

export const useInitAnalytics = () => {
  const { fbclid, ttclid } = queryParser(window.location.search);
  const tiktokScript = ttclid ? tiktok : '';
  const initCallback = (analytics: string) => {
    window.sessionStorage?.setItem(`${analytics}Init`, 'true');
  };

  useEffect(() => {
    if (GOOGLE_MEASUREMENT_ID) {
      GA4.initialize(GOOGLE_MEASUREMENT_ID);
    }
  });

  useEffect(() => {
    initAmplitude(undefined, initCallback);
  });

  useEffect(() => {
    const checkCookies = setInterval(() => {
      const id = Cookies.get(COOKIE_UUID_KEY);
      if (id) {
        initGismart(id, initCallback);
        initLockerStudio(id, initCallback);
        if (fbclid) {
          // @ts-ignore
          FacebookPixel.init(FB_PIXEL_ID, { external_id: id });
          FacebookPixel.pageView();
        }
        clearInterval(checkCookies);
      }
    }, 500);
  });

  useInlineScript(tiktokScript, 'TiktokJelly');
};
