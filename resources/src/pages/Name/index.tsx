import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setName } from '../../core/store/signup';
import {
  useDebounce,
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
  const debouncedEmail = useDebounce(value, 200);
  const submitName = () => {
    // TODO send name to the server
    dispatch(setName(value));
    const eventParams = { userName: value };
    sendEvents(EVENTS.ENTER_NAME_SUBMITTED, eventParams);
    dispatch(setEventData(eventParams));
    navigate(nextPage);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const nameRegexp = /^[a-zA-Zа-яА-ЯёЁ]+(?:[-\s][a-zA-Zа-яА-ЯёЁ]+)*[-\s]?[a-zA-Zа-яА-ЯёЁ]*$/;
    if (value.length > 0 && !value.match(nameRegexp)) return;
    setValue(value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitName();
    }
  };

  usePreloadNextPage(nextPage);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <>
      <S.Title>{t('what_is_your_name')}</S.Title>
      <S.Input
        type="text"
        placeholder={t('name')}
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        ref={ref}
        id={'name-input'}
      />
      <NextButton onClick={submitName} disabled={debouncedEmail.length < 2} {...buttonStyles} />
    </>
  );
};

export default Age;
