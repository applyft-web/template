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

interface ItemProps {
  year: string;
  percent: string;
  text: string;
}

const F4 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const list: ItemProps[] = [
    {
      year: '2022',
      percent: '44%',
      text: t('forgot_the_name'),
    },
    {
      year: '2023',
      percent: '30%',
      text: t('lost_their_keys'),
    },
    {
      year: '2020',
      percent: '35%',
      text: t('had_difficulty'),
    },
  ];
  const renderList = (item: ItemProps, index: number) => {
    const { year, percent, text } = item;

    return (
      <S.ListItem key={index}>
        <S.ListItemYear>{year}&nbsp;{t('survey')}</S.ListItemYear>
        <S.ListItemPercent>{percent}</S.ListItemPercent>
        <S.ListItemText>{text}</S.ListItemText>
      </S.ListItem>
    );
  };
  const onContinueClick = () => {
    sendEvents(EVENTS.FACT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <>
      <S.Title>{t('you_are_not_alone')}</S.Title>
      <S.Subtitle>{t('craft_your_training_plan')}</S.Subtitle>
      <S.List className={'scrollable'}>{list.map(renderList)}</S.List>
      <NextButton onClick={onContinueClick} />
    </>
  );
};

export default F4;
