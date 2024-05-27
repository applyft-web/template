import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentAge } from '../../core/store/quiz';
import {
  useNextPageName,
  usePreloadNextPage,
  useSendEvents,
  useViewportSize,
  useCustomNavigate,
} from '../../core/hooks';
import { setEventData } from '../../core/store/events';
import { EVENTS } from '../../core/constants';
import { NextButton } from '../../components';
import * as S from './styled';

const Age = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const buttonStyles = useViewportSize();
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      isNaN(+value) ||
      (value !== '' && +value === 0) ||
      (value.length > 1 && (+value > 100 || +value < 18))
    ) return;
    setValue(value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAge();
    }
  };
  const submitAge = () => {
    dispatch(setCurrentAge(value));
    const eventParams = { currentAge: value };
    sendEvents(EVENTS.ENTER_AGE_SUBMITTED, eventParams);
    dispatch(setEventData(eventParams));
    navigate(nextPage);
  };

  usePreloadNextPage(nextPage);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <>
      <S.Title>{t('what_age')}</S.Title>
      <S.InputWrapper $valid={ref.current?.checkValidity() || false} $focused={focused}>
        <S.Input
          type={'text'}
          inputMode={'numeric'}
          required={true}
          value={value}
          onChange={onChangeHandler}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onKeyPress={onKeyPressHandler}
          ref={ref}
        />
      </S.InputWrapper>
      <S.Info>
        <svg className={'info-icon'} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3125 0H4.6875C2.09875 0 0 2.09875 0 4.6875V11.3125C0 13.9012 2.09875 16 4.6875 16H11.3125C13.9012 16 16 13.9012 16 11.3125V4.6875C16 2.09875 13.9012 0 11.3125 0ZM9.205 12.9987H6.795V6.55125H9.205V12.9987ZM9.205 4.97875H6.795V3.00125H9.205V4.97875Z" fill="#C9CCE2"/>
        </svg>
        <div>{t('we_ask_you')}</div>
        <div>{t('older_individuals')}</div>
      </S.Info>
      <NextButton onClick={submitAge} disabled={value.length < 2} {...buttonStyles} />
    </>
  );
};

export default Age;
