import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setDiscover } from '../../../core/store/quiz';
import { setEventData } from '../../../core/store/events';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useEngString,
  useCustomNavigate,
} from '../../../core/hooks';
import { QuizPageContainer } from '../../../containers';

const Q3 = () => {
  const { t,  } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const titleKey = 'which_abilities';
  const title: string = t(titleKey);
  const subtitle: string = t('choose_multiple_options');
  const onContinueClick = (arr: string[]) => {
    const answer = arr.join(', ');
    const localEventParams = { abilities: answer };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    dispatch(setDiscover(arr));
    navigate(nextPage);
  };
  const answers = [
    'memory_and_recall',
    'attention_and_concentration',
    'problem_solving',
    'creativity_and_imagination',
    'language_skills',
    'decision_making',
    'emotional_regulation',
    'stress_management',
    'learning_efficiency_and_speed',
  ];

  usePreloadNextPage(nextPage);

  return (
    <QuizPageContainer
      {...{ answers, title, subtitle }}
      isMultiChoice={true}
      onContinueClick={onContinueClick}
    />
  );
};

export default Q3;
