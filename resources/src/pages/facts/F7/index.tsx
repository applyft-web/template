import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectName } from '../../../core/store/signup';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../../core/hooks';
import { NextButton } from '../../../components';
import * as S from './styled';

const F7 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const name = useSelector(selectName);
  const onContinueClick = () => {
    sendEvents(EVENTS.FOUR_WEEKS_RESULT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <div className={'scrollable'}>
      <S.Title><span>{name}</span>,&nbsp;{t('four_weeks_plan_is_ready')}</S.Title>
      <S.Diagram>
        {[...Array(3)].map((_, index) => {
          return (
            <S.DiagramItem key={index} />
          );
        })}
        <S.Weeks>
          {[...Array(4)].map((_, index) => {
            return (
              <div key={index}>{`${t('week')} ${index+1}`}</div>
            );
          })}
        </S.Weeks>
        <S.Tooltip1>{t('now')}</S.Tooltip1>
        <S.Tooltip2>{t('after_4_weeks')}</S.Tooltip2>
      </S.Diagram>
      <S.Note>{t('chart')}</S.Note>
      <NextButton onClick={onContinueClick} />
    </div>
  );
};

export default F7;
