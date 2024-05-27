import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setGoal } from '../../../core/store/quiz';
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
  const titleKey = 'what_is_your_goal';
  const title: string = t(titleKey);
  const subtitle: string = t('choose_multiple_options');
  const onContinueClick = (arr: string[]) => {
    const answer = arr.join(', ');
    const localEventParams = { goal: answer };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    dispatch(setGoal(arr));
    navigate(nextPage);
  };
  const answers = [
    'goal_keep_mind_in_top',
    'goal_check_iq',
    'goal_understand_potential',
    'goal_chill_out',
    'goal_puzzles',
    'goal_other',
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
