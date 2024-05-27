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
import { TwoOptionsList } from '../../../components';
import * as S from './styled';

const Q2 = () => {
  const { t,  } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const titleKey = 'ppl_use_brain';
  const title: string = t(titleKey);
  const options = ['truth', 'myth'];
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
    <>
      <S.Title>{title}</S.Title>
      <TwoOptionsList {...{ options, onClickFunction }}/>
    </>
  );
};

export default Q2;
