import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setEventData } from '../../core/store/events';
import { EVENTS } from '../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useEngString,
  useCustomNavigate,
} from '../../core/hooks';
import { QuizPageContainer } from '../../containers';

interface SimpleQuizPageProps {
  titleKey: string;
  answers: string[];
}

export const SimpleQuizPage = ({
  titleKey,
  answers,
}: SimpleQuizPageProps) => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const title: string = t(titleKey);
  const onClickFunction = (key: string) => {
    const localEventParams = { [titleKey]: key };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer: key,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  return (
    <QuizPageContainer
      answers={answers}
      title={title}
      onContinueClick={onClickFunction}
      centred={true}
    />
  );
};
