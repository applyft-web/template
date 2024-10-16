import React, { useEffect, useState } from 'react';
import { EVENTS as E } from '../../core/constants';
import {
  useDelayedExecute,
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
  useEventNameConstructor,
} from '../../core/hooks';
import { CreatingAnimation } from '@applyft-web/ui-components';

const CreatingProfile = ({ screenId = '' }: { screenId?: string }) => {
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents({ screenId });
  const getEventName = useEventNameConstructor({ screenId });
  const delayedExecute = useDelayedExecute();
  const [animationDone, setAnimationDone] = useState(false);
  const [initEventSent, setInitEventStatus] = useState(false);

  usePreloadNextPage();

  useEffect(() => {
    if (initEventSent) return;
    sendEvents(getEventName(E.LOAD), { [E.SL]: screenId });
    setInitEventStatus(true);
  }, [sendEvents, initEventSent, getEventName, screenId]);

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
