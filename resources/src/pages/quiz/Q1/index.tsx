import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setAge } from '../../../core/store/quiz';
import { setEventData } from '../../../core/store/events';
import { EVENTS } from '../../../core/constants';
import {
  useSendEvents,
  useEngString,
  usePreloadNextPage,
  useNextPageName,
  useCustomNavigate,
} from '../../../core/hooks';
import * as S from './styled';

export interface AgesProps {
  type: string;
  description: string;
}

export const ages: AgesProps[] = [
  {
    type: 'young',
    description: '18-29',
  },
  {
    type: 'adult',
    description: '30-49',
  },
  {
    type: 'middle',
    description: '50-65',
  },
  {
    type: 'senior',
    description: '65+',
  },
];

const Q1 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents({ extraPathname: '/q1' });
  const getEngString = useEngString();
  const titleKey = 'get_personal_plan';
  const onContinueClick = ({ type, description }: AgesProps) => {
    const localEventParams = { age: `${type} (${description})` };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer: description,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    dispatch(setAge(type));
    navigate(nextPage);
  };
  const renderOptions = (item: AgesProps, index: number) => {
    const { type, description } = item;
    return (
      <S.OptionsItem
        onClick={() => onContinueClick(item)}
        $type={type}
        key={index}
      >
        <S.OptionsItemTitle>
          <span>{`${description}`}</span>
          <svg className={'icon'} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M5.66671 4.6062C5.1775 4.10153 5.1775 3.28328 5.66671 2.7786C6.15592 2.27393 6.9491 2.27393 7.43831 2.7786L12.4998 8.0001L7.43831 13.2216C6.9491 13.7263 6.15593 13.7263 5.66671 13.2216C5.1775 12.7169 5.1775 11.8987 5.66671 11.394L8.95661 8.0001L5.66671 4.6062Z" fill="#292C44"/>
            </g>
          </svg>
        </S.OptionsItemTitle>
      </S.OptionsItem>
    );
  };

  usePreloadNextPage(nextPage);

  return (
    <div className={'scrollable'}>
      <S.HeaderLogo />
      <S.Title>{t(titleKey)}</S.Title>
      <S.Subtitle>{t('two_minute_quiz')}</S.Subtitle>
      <S.Options>
        {ages.map(renderOptions)}
      </S.Options>
    </div>
  );
};

export default Q1;
