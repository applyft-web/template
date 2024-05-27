import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { selectDeeplinkToken } from '../store/signup';
import { selectEventsData } from '../store/events';
import { APP_ONE_LINK, FB_PIXEL_ID, FBC_PARAM, FBP_PARAM } from '../constants';

export const useGenerateDeepLink = () => {
  const deepLinkToken = useSelector(selectDeeplinkToken);
  const eventsData = useSelector(selectEventsData);
  const [oneLinkUrl, setOneLinkUrl] = useState<string>('');

  useEffect(() => {
    const fbc = Cookies.get(FBC_PARAM) || '';
    const fbp = Cookies.get(FBP_PARAM) || '';
    const AFUserID = Cookies.get('afUserId') || '';
    const resultLink = window.AF_SMART_SCRIPT?.generateOneLinkURL({
      oneLinkURL: APP_ONE_LINK,
      afParameters: {
        mediaSource: {keys: ['utm_source', 'af_pid'], defaultValue: `${eventsData?.utm_source || ""}`},
        campaign: {
          keys: ['utm_campaign', 'af_c'],
          defaultValue: `${eventsData?.utm?.utm_campaign || eventsData?.utm?.af_c || ''}`
        },
        channel: {keys: ['AdChannel', 'utm_medium', 'af_channel'], defaultValue: `${eventsData?.utm?.af_channel || ''}`},
        ad: {
          keys: ['utm_ad', 'af_ad', 'AdName',],
          defaultValue: `${eventsData?.utm?.utm_ad || eventsData?.utm?.af_ad || ''}`
        },
        adSet: {
          keys: ['utm_content' || 'af_adset', 'AdSetName'],
          defaultValue: `${eventsData?.utm?.utm_content || eventsData?.utm?.af_adset || ''}`
        },
        deepLinkValue: {
          keys: ['deep_link_value'],
          defaultValue: `${eventsData?.utm?.deep_link_value || eventsData?.deep_link_value || deepLinkToken || ''}`
        },
        afSub1: {keys: ['af_sub1'], defaultValue: `${deepLinkToken}`},
        afSub2: {keys: ['af_sub2', 'fbclid'], defaultValue: ''},
        afSub3: {keys: ['af_sub3'], defaultValue: `${FB_PIXEL_ID}`},
        afSub4: {keys: ['af_sub4'], defaultValue: `${fbc};${fbp};${AFUserID}`},
        afSub5: {keys: ['af_sub5'], defaultValue: encodeURI(window.navigator.userAgent)}
      }
    });
    if (resultLink) setOneLinkUrl(`${resultLink.clickURL}&af_dp=brainbloom://`);
    // window.AF_SMART_SCRIPT.displayQrCode('qrcode');
  }, [deepLinkToken, eventsData]);

  return oneLinkUrl;
};
