import React, { useEffect, useState } from 'react';
import { EVENTS } from '../../core/constants';
import {
  useDelayedExecute,
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../core/hooks';
import { CreatingAnimation } from '@applyft-web/ui-components';

const CreatingProfile = () => {
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const delayedExecute = useDelayedExecute();
  const [animationDone, setAnimationDone] = useState(false);
  const [initEventSent, setInitEventStatus] = useState(false);

  usePreloadNextPage(nextPage);

  useEffect(() => {
    if (initEventSent) return;
    sendEvents(EVENTS.CREATING_PROFILE);
    setInitEventStatus(true);
  }, [sendEvents, initEventSent]);

  useEffect(() => {
    if (animationDone) {
      delayedExecute(() => navigate(nextPage));
    }
  }, [animationDone, navigate, nextPage, delayedExecute]);

  return (
    <CreatingAnimation doneCallback={(res) => setAnimationDone(res)} />
  );
};

export default CreatingProfile;
