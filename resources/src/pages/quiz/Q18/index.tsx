import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setDaily } from '../../../core/store/quiz';
import { setEventData } from '../../../core/store/events';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useEngString,
  useDelayedExecute,
  useCustomNavigate,
} from '../../../core/hooks';
import { OptionsList, OptionsItem } from '@applyft-web/ui-components';
import * as S from './styled';

interface OptionProps {
  content: string;
  key: string;
  description: string;
}

const Q18 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const getEngString = useEngString();
  const delayedExecute = useDelayedExecute();
  const [active, setActive] = React.useState<string | null>(null);
  const titleKey = 'time_ready_to_spend';
  const title: string = t(titleKey);
  const onClickFunction = (key: string) => {
    setActive(key);
    const localEventParams = { daily: key };
    const eventParams = {
      ...localEventParams,
      question: getEngString(titleKey),
      answer: key,
    };
    sendEvents(EVENTS.QUESTION_SUBMITTED, eventParams);
    dispatch(setEventData(localEventParams));
    dispatch(setDaily(key));
    delayedExecute(() => navigate(nextPage));
  };
  const options: OptionProps[] = [
    {
      content: t('5_min_day'),
      description: t('regular'),
      key: getEngString('regular'),
    },
    {
      content: t('10_min_day'),
      description: t('serious'),
      key: getEngString('serious'),
    },
    {
      content: t('20_min_day'),
      description: t('challenging'),
      key: getEngString('challenging'),
    },
  ];
  const renderOptions = (item: OptionProps, index: number) => {
    const isActive = active === item.key;

    return (
      <OptionsItem
        onClick={() => onClickFunction(item.key)}
        isActive={isActive}
        customStyles={`padding:8px 16px;justify-content:center;${isActive ? 'color:#292C44;' : ''}`}
        key={index}
      >
        <S.Inner $isActive={isActive}>
          <div>{item.content}</div>
          <div>{item.description}</div>
        </S.Inner>
      </OptionsItem>
    );
  };

  usePreloadNextPage(nextPage);

  return (
    <>
      <S.Title>{title}</S.Title>
      <S.Description>{t('this_will_help')}</S.Description>
      <OptionsList customStyles={'margin-top:16px;'}>{options.map(renderOptions)}</OptionsList>
    </>
  );
};

export default Q18;
