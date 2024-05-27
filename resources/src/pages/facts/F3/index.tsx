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

interface AbilityProps {
  name: string;
  percentage: string;
}

const F3 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const abilities: AbilityProps[] = [
    {
      name: 'memory',
      percentage: '+10-20%',
    },
    {
      name: 'problem_solving',
      percentage: '+15-20%',
    },
    {
      name: 'attention',
      percentage: '+10-15%',
    },
    {
      name: 'creativity',
      percentage: '+10-15%',
    },
  ];
  const renderAbility = (ability: AbilityProps, index: number) => {
    const { name, percentage } = ability;

    return (
      <S.Ability key={index}>
        <S.AbilityIcon $type={name} />
        <S.AbilityName>{t(name)}</S.AbilityName>
        <S.AbilityPercentage>{percentage}</S.AbilityPercentage>
      </S.Ability>
    );
  };
  const onContinueClick = () => {
    sendEvents(EVENTS.FACT_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <div className={'scrollable'}>
      <S.Title>{t('brain_myth')}</S.Title>
      <S.Subtitle>{t('brain_is_active')}</S.Subtitle>
      <S.Description>{t('trainable_brain')}</S.Description>
      <S.AbilitiesList>
        {abilities.map(renderAbility)}
      </S.AbilitiesList>
      <S.Note>{t('it_takes_10_min')}</S.Note>
      <NextButton onClick={onContinueClick} />
    </div>
  );
};

export default F3;
