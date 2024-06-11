import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAndroid, isDesktop, isIOS, osName, osVersion } from 'react-device-detect';
import { useCustomNavigate, useNextPageName, useSendEvents } from '../../core/hooks';
import { EVENTS } from '../../core/constants';
import { setPaywallType } from '../../core/store/plans';
import { setEventData } from '../../core/store/events';
import { setAmplitudeUserProperties } from '../../analytics';
import { useLandingType, queryParser } from '@applyft-web/utils';
import { landingTypesList } from '../../core/router';
import { ContinueButton } from '@applyft-web/ui-components';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const location = useLocation();
  const sendEvents = useSendEvents();
  const [eventParams, setEventParams] = useState(false);
  const landingParam = location.pathname.replace(/\//g, '');
  const { landingType, paywallType } = useLandingType(landingParam, landingTypesList);

  useEffect(() => {
    if (eventParams || !paywallType) return;

    dispatch(setPaywallType(paywallType));
    const { fbclid, gclid, ttclid, ...utms } = queryParser(location.search);
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      Adset_name,
      Ad_name,
      CampaignID,
      AdSetID,
      AdID,
    } = utms;
    const facebookUtm = fbclid ? 'facebook' : null;
    const appDomain = `${window.location.origin}${location.pathname}`;
    const utmSource = utms['utm_source'] || facebookUtm || 'organic';
    utms['utm_source'] = utmSource;
    const getOnboardingType = () => {
      const hostParts = window.location.host.split('.');
      if (hostParts.length > 2) {
        return `${hostParts[0].replace('-stage', '')}_`;
      }
      return '';
    };

    const localEventsData = {
      landing_type: `${getOnboardingType()}${landingType}`,
      app_domain: appDomain,
      app_name: 'BrainBloom',
      landingType,
      appDomain,
      appName: 'BrainBloom',
      fbclid,
      gclid,
      ttclid,
      utm: utms,
      utm_source: utmSource,
      os: `${osVersion} ${osName}`,
    };

    const userProperties = {
      AppDomain: appDomain,
      OSDevice: `${
        isDesktop ? 'desktop' : isIOS ? 'iOS' : isAndroid ? 'Android' : osName
      }`,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      Adset_name,
      Ad_name,
      CampaignID,
      AdSetID,
      AdID,
    };

    dispatch(setEventData(localEventsData));
    setAmplitudeUserProperties(userProperties);
    setEventParams(true);
  }, [dispatch, landingType, location, paywallType, eventParams, landingParam]);

  useEffect(() => {
    if (eventParams) sendEvents(EVENTS.ONBOARDING_STARTED);
  }, [eventParams, sendEvents]);

  return (
    <>
      <div>
        <h1>Developer!</h1>
        <br/>
        <p>Don't forget to set up: <mark>constants</mark>, <mark>router</mark>, <mark>store</mark> and <mark>theme</mark> (if you are using custom one) in <b>core</b></p>
        <br/>
        <p>You also have to set environments variables according the example: <a href={'https://github.com/applyft-web/template/blob/main/README.md#usage'} target={'_blank'} rel={'noreferrer'} style={{color: 'aquamarine'}}>github.com/applyft-web/template</a></p>
        <br/>
        <p>Add your own pages, components, etc. Modify existing ones. Remove what you don't need.</p>
        <br/>
        <p>Enjoy! (:</p>
      </div>
      <ContinueButton onClick={() => navigate(nextPage)} customStyles={'bottom: 60px'} />
    </>
  );
};

export default WelcomeScreen;
