import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../../../core/constants';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useCustomNavigate,
} from '../../../core/hooks';
import { NextButton } from '../../../components';
import * as S from './styled';

const F6 = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const onContinueClick = (consent: boolean = true) => {
    if (consent) sendEvents(EVENTS.CONSENT_EMAIL_SUBMITTED);
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  useEffect(() => {
    sendEvents(EVENTS.CONSENT_EMAIL_SHOWN);
  }, [sendEvents]);

  return (
    <>
      <S.Img />
      <S.Title dangerouslySetInnerHTML={{ __html: t('special_offers')}} />
      <NextButton onClick={onContinueClick} customStyles={'bottom: 52px;'} />
      <S.Refusal onClick={() => onContinueClick(false)} id={'refusal_button'} >{t('dont_want')}</S.Refusal>
    </>
  );
};

export default F6;
