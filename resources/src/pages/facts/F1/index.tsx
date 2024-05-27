import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAge } from '../../../core/store/quiz';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../../core/hooks';
import { NextButton } from '../../../components';
import * as S from './styled';

const F1 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const age = useSelector(selectAge) || 'young';
  const ages: { [key: string]: string } = {
    young: '20s',
    adult: '30s',
    middle: '40s',
    senior: '60s',
  };
  const onContinueClick = () => {
    sendEvents(EVENTS.FACT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <>
      <S.Title><span className={'highlighted'}>2,&nbsp;000&nbsp;000+</span>&nbsp;{t('people')}</S.Title>
      <S.Subtitle>{t('have_already', { age: ages[age] })}</S.Subtitle>
      <S.Image $type={age} />
      <NextButton onClick={onContinueClick} />
    </>
  );
};

export default F1;
