import React from 'react';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../../core/hooks';
import { NextButton, PotentialProgressBlock } from '../../../components';
import * as S from './styled';

const F5 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getDate = (days: number = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toLocaleString(navigator.language || 'default', { month: 'long', day: 'numeric' })
  };
  const onContinueClick = () => {
    sendEvents(EVENTS.FACT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <div className={'scrollable'}>
      <S.Title dangerouslySetInnerHTML={{ __html: t('your_plan_is_ready')}} />
      <S.Description>{t('based_of_you_answer')}</S.Description>
      <PotentialProgressBlock date1={getDate()} date2={getDate(14)} />
      <NextButton onClick={onContinueClick} />
    </div>
  );
};

export default F5;
