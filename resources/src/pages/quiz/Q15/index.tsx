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

const Q15 = () => {
  const { t,  } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const titleKey = 'play_games';
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
    'chess',
    'checkers',
    'backgammon',
    'cards',
    'sudoku',
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

export default Q15;
