import React from 'react';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../../core/hooks';
import { NextButton } from '../../../components';
import * as S from './styled';

const F2 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const onContinueClick = () => {
    sendEvents(EVENTS.FACT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <>
      <S.Img />
      <S.Title>{t('on_the_right_path')}</S.Title>
      <S.Subtitle>{t('you_will_discover')}</S.Subtitle>
      <NextButton onClick={onContinueClick} />
    </>
  );
};

export default F2;
