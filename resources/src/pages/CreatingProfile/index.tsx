import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../../core/constants';
import {
  useDelayedExecute,
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../core/hooks';
import { CircularProgress, ReviewsBlock } from '../../components';
import * as S from './styled';

const CreatingProfile = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const delayedExecute = useDelayedExecute();
  const [progress, setProgress] = useState(0);
  const [initEventSent, setInitEventStatus] = useState(false);

  usePreloadNextPage(nextPage);

  useEffect(() => {
    if (initEventSent) return;
    sendEvents(EVENTS.CREATING_PROFILE);
    setInitEventStatus(true);
  }, [sendEvents, initEventSent]);

  useEffect(() => {
    if (progress === 100) {
      delayedExecute(() => navigate(nextPage));
    }
  }, [progress, navigate, nextPage, delayedExecute]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      )
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <S.ProgressWrapper>
        <CircularProgress progress={progress}>
          <S.Percentage>{progress}<span>%</span></S.Percentage>
        </CircularProgress>
        <S.Title>{t('creating_plan')}</S.Title>
      </S.ProgressWrapper>
      <ReviewsBlock mt={24} mb={64} />
    </>
  );
};

export default CreatingProfile;
