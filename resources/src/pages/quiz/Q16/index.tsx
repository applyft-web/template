import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setEventData } from '../../../core/store/events';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useEngString,
  useCustomNavigate,
} from '../../../core/hooks';
import { icons } from './icons';
import { QuizPageContainer } from '../../../containers';

const Q16 = () => {
  const { t,  } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const titleKey = 'memory_skills';
  const title: string = t(titleKey);
  const onContinueClick = (arr: string[]) => {
    const answer = arr.join(', ');
    const localEventParams = { [titleKey]: answer };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    navigate(nextPage);
  };
  const answers = [
    'recalling_names',
    'facts_and_information',
    'passwords_and_codes',
    'tasks_and_events',
    'language_vocab',
    'other',
  ];
  const answersList = answers.map((answer) => ({
    content: (
      <>
        {icons[answer]}
        <span>{t(answer)}</span>
      </>
    ),
    key: getEngString(answer),
  }));

  usePreloadNextPage(nextPage);

  return (
    <QuizPageContainer
      {...{ answers, answersList, title }}
      isMultiChoice={true}
      onContinueClick={onContinueClick}
    />
  );
};

export default Q16;
