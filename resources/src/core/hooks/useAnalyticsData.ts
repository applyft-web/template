import React, { useState, useEffect, useMemo, type SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
  FBC_PARAM,
  FBP_PARAM,
  FB_PIXEL_ID,
  TIKTOK_PIXEL_ID,
  TTP_PARAM,
  GOOGLE_MEASUREMENT_ID,
} from '../constants';
import { selectEventsData } from '../store/events';
import { selectUuid } from '../store/signup';

const getGoogleClientID = (setFn: React.Dispatch<SetStateAction<null | string>>) => {
  if (window.ga) {
    window.ga('create', GOOGLE_MEASUREMENT_ID, 'auto');
    window.ga((tracker: any) => {
      setFn(tracker.get('clientId'));
    });
  }
};

export const useAnalyticsData = () => {
  const [data, setData] = useState({});
  const [cid, setCid] = useState<null | string>(null);
  const eventsData = useSelector(selectEventsData);
  const userUuid = useSelector(selectUuid);
  const { fbclid, gclid, ttclid, appDomain } = eventsData;
  // const AFUserID = Cookies.get('afUserId');
  const fbc = Cookies.get(FBC_PARAM);
  const fbp = Cookies.get(FBP_PARAM);
  const ttp = Cookies.get(TTP_PARAM);
  const activePixelData = useMemo(() => {
    return fbclid
      ? { "fb_pixel_id": FB_PIXEL_ID }
      : ttclid
        ? { "tt_pixel_id": TIKTOK_PIXEL_ID }
        : {}
      ;
  }, [fbclid, ttclid]);
  const activePixelUserData = useMemo(() => {
    return fbclid
      ? { fbc, fbp, "fb_click_id": fbc || fbclid || '' }
      : ttclid
        ? { ttp, "tt_click_id": ttclid || '' }
        : {}
      ;
  }, [fbc, fbp, fbclid, ttclid, ttp]);

  const encodedSource = encodeURIComponent(appDomain);

  useEffect(() => getGoogleClientID(setCid), []);

  useEffect(() => {
    setData(
      {
        // appsflyer_id: AFUserID,
        google_tracking_id: GOOGLE_MEASUREMENT_ID,
        google_client_id: cid || "",
        ...activePixelData,
        user_data: {
          uuid: userUuid,
          ...activePixelUserData,
          source_url: encodedSource,
          google_click_id: gclid || '',
        }
      }
    );
  }, [cid, userUuid, fbc, fbp, fbclid, gclid, encodedSource , activePixelData, activePixelUserData]);

  return data;
};
