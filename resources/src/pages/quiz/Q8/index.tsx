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

const Q8 = () => {
  const { t,  } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const titleKey = 'inability_to_recall';
  const title: string = t(titleKey);
  const options = ['yes', 'no'];
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
  const icons = {
    yes: (
      <svg className={'icon'} width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path className={'icon-path'} d='M20.25 0C14.9472 0.0048411 9.86288 2.11899 6.1132 5.87838C2.36352 9.63777 0.254829 14.7352 0.25 20.0518C1.34479 46.653 39.1493 46.6459 40.25 20.0517C40.2425 14.7359 38.1329 9.64008 34.3838 5.88129C30.6347 2.12251 25.552 0.00751809 20.25 0ZM30.2185 15.2678L18.4705 27.062C18.1692 27.3582 17.7632 27.5228 17.3412 27.5198C16.9193 27.5169 16.5157 27.3466 16.2185 27.0462L10.25 20.8886C9.9689 20.5854 9.81768 20.1837 9.82887 19.7699C9.84005 19.3561 10.0127 18.9632 10.3098 18.6757C10.6069 18.3882 11.0046 18.2291 11.4175 18.2325C11.8304 18.2359 12.2254 18.4016 12.5177 18.694L17.3681 23.699L27.998 13.0416C28.2945 12.7561 28.6907 12.5984 29.1017 12.6026C29.5128 12.6067 29.9058 12.7722 30.1965 13.0636C30.4871 13.355 30.6522 13.7491 30.6564 14.1612C30.6605 14.5733 30.5033 14.9706 30.2185 15.2678Z' fill='#858BB9'/>
      </svg>
    ),
    no: (
      <svg className={'icon'} width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path className={'icon-path'} d='M20.25 0C14.948 0.00751817 9.86525 2.12253 6.11615 5.88134C2.36704 9.64015 0.257499 14.736 0.25 20.0518C1.35468 46.6536 39.1592 46.6452 40.25 20.0517C40.2451 14.7351 38.1364 9.63771 34.3867 5.87835C30.6371 2.11898 25.5528 0.00484939 20.25 0ZM27.2264 24.6305C27.5183 24.9236 27.6838 25.3197 27.6873 25.7338C27.6908 26.148 27.5321 26.5469 27.2452 26.8448C26.9583 27.1428 26.5662 27.3159 26.1533 27.327C25.7404 27.3381 25.3397 27.1863 25.0373 26.9041L20.25 22.2465L15.4626 26.9042C15.1632 27.1936 14.7618 27.3528 14.3459 27.3468C13.93 27.3409 13.5332 27.1705 13.2421 26.8726C12.9548 26.5686 12.7972 26.164 12.8031 25.7452C12.809 25.3264 12.9778 24.9264 13.2736 24.6306L17.9823 20.0518L13.2736 15.4731C12.9778 15.1773 12.809 14.7773 12.8031 14.3585C12.7972 13.9397 12.9548 13.5351 13.2421 13.2311C13.5341 12.9347 13.9305 12.7653 14.3459 12.7594C14.7613 12.7535 15.1624 12.9115 15.4626 13.1995L20.25 17.8572L25.0374 13.1995C25.3399 12.9182 25.7404 12.767 26.1529 12.7784C26.5653 12.7898 26.9569 12.9629 27.2434 13.2606C27.53 13.5582 27.6887 13.9566 27.6855 14.3703C27.6823 14.784 27.5175 15.1799 27.2264 15.4731L22.5178 20.0518L27.2264 24.6305Z' fill='#858BB9'/>
      </svg>
    ),
  };

  usePreloadNextPage(nextPage);

  return (
    <>
      <S.Question>{t('sound_familiar')}</S.Question>
      <S.Title>{title}</S.Title>
      <TwoOptionsList {...{ options, icons, onClickFunction }}/>
    </>
  );
};

export default Q8;
