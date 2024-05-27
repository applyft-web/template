import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAge, selectGoal, selectDiscover, selectCurrentAge } from '../../core/store/quiz';
import { EVENTS, SESSION_STORAGE_RANDOM_PERCENTAGE_KEY } from '../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../core/hooks';
import { ages, type AgesProps } from '../quiz';
import { NextButton, CircularProgress } from '../../components';
import * as S from './styled';

interface LevelProps {
  type: string;
  value: string;
}

interface ChoicesProps extends AgesProps {}

const getType = (age: number): string => {
  if (age >= 65) {
    return 'senior';
  } else if (age >= 50) {
    return 'middle';
  } else if (age >= 30) {
    return 'adult';
  } else {
    return 'young';
  }
};

const QuizResults = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const currentAge = useSelector(selectCurrentAge);
  const ageTypeFromQuiz = useSelector(selectAge);
  const ageType = currentAge ? getType(+currentAge) : ageTypeFromQuiz;
  const goal = useSelector(selectGoal);
  const discover = useSelector(selectDiscover);
  const [ready, setReady] = useState(false);
  const onContinueClick = () => {
    sendEvents(EVENTS.QUIZ_RESULTS_SUBMITTED);
    navigate(nextPage);
  };
  const getRandomPercentage = (): string => {
    let percentage: string;
    const storagePercentage = window.sessionStorage?.getItem(SESSION_STORAGE_RANDOM_PERCENTAGE_KEY);

    if (storagePercentage) {
      percentage = storagePercentage;
    } else {
      percentage = `${25 + Math.round(Math.random()*10)}%`;
      window.sessionStorage?.setItem(SESSION_STORAGE_RANDOM_PERCENTAGE_KEY, percentage)
    }

    return percentage;
  };
  const progressCustomStyles: string = `
    background-color: #292C44;
    box-shadow: inset 0 0 0 6px #585B7E;
  `;
  const getSortListString = (list: string[]): string => {
    return `${list.slice(0, 2).join(', ')}${list.length > 2 ? '...' : ''}`;
  };
  const levels: {[key: string]: LevelProps[]} = {
    young: [
      {
        type: 'memory_level',
        value: '55%',
      },
      {
        type: 'concentration_level',
        value: '55%',
      },
      {
        type: 'iq_level',
        value: '90-110',
      },
    ],
    adult: [
      {
        type: 'memory_level',
        value: '85%',
      },
      {
        type: 'concentration_level',
        value: '75%',
      },
      {
        type: 'iq_level',
        value: '105-115',
      },
    ],
    middle: [
      {
        type: 'memory_level',
        value: '70%',
      },
      {
        type: 'concentration_level',
        value: '70%',
      },
      {
        type: 'iq_level',
        value: '105-115',
      },
    ],
    senior: [
      {
        type: 'memory_level',
        value: '50%',
      },
      {
        type: 'concentration_level',
        value: '60%',
      },
      {
        type: 'iq_level',
        value: '90-100',
      },
    ],
  };
  const choices: ChoicesProps[] = [
    {
      type: 'your_age',
      description: currentAge ?? ages.find(el => el.type === ageType)?.description ?? '18-29',
    },
    {
      type: 'your_goal',
      description: getSortListString(goal),
    },
    {
      type: 'you_prefer_discover',
      description: getSortListString(discover),
    },
    {
      type: 'your_potential_boost',
      description: t('percentage_per_month', { percentage: getRandomPercentage() }),
    },
  ];
  const renderAges = (item: AgesProps, index: number) => (
    <S.AgeItem $isSelected={item.type === ageType} key={index}>
      {t('age')}&nbsp;{item.description}
    </S.AgeItem>
  );
  const renderLevels = (item: LevelProps, index: number) => {
    const isDoubledValue = item.type === 'iq_level';
    const progress = !ready
      ? [0,0]
      : item.value
        .replace('%', '')
        .split('-')
        .map(e => +e/(isDoubledValue ? 1.25 : 1));

    return (
      <S.LevelsItem key={index}>
        <CircularProgress
          size={86}
          progress={progress}
          customStyles={progressCustomStyles}
        >
          <S.ProgressValue>{item.value}</S.ProgressValue>
        </CircularProgress>
        <span>{t(item.type)}</span>
      </S.LevelsItem>
    );
  }
  const renderChoices = (item: ChoicesProps, index: number) => (
    <S.ChoicesItem $image={item.type} key={index}>
      <div>{t(item.type)}</div>
      <div>{item.description}</div>
    </S.ChoicesItem>
  );

  usePreloadNextPage(nextPage);

  useEffect(() => {
    const timer = setTimeout(
      () => setReady(true),
      100
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <S.Title>{t('activity_profile')}</S.Title>
      <S.Block className={'scrollable'}>
        <S.Ages>{ages.map(renderAges)}</S.Ages>
        <S.Levels>{levels[ageType || 'young'].map(renderLevels)}</S.Levels>
        <S.Note>
          <div>{t('great_start')}</div>
          <div>{t('results_note')}</div>
        </S.Note>
        <S.Choices>{choices.map(renderChoices)}</S.Choices>
        <S.BackgroundImage />
      </S.Block>
      <NextButton onClick={onContinueClick} />
    </>
  );
};

export default QuizResults;
