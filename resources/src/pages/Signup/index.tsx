import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  sendSignupRequest,
  selectEmail,
  selectEmailValidity,
  selectUuid,
  selectIsSuccess,
  selectPaymentSettingsStatus,
  setEmail,
} from '../../core/store/signup';
import { selectPaywallType } from '../../core/store/plans';
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
import { NextButton, ReviewsBlock, SignupInput } from '../../components';
import * as S from './styled';

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isArabic = navigator.language.startsWith('ar');

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents();
  const buttonStyles = useViewportSize();
  const email = useSelector(selectEmail);
  const isEmailValid = useSelector(selectEmailValidity);
  const uuid = useSelector(selectUuid);
  const isSuccess = useSelector(selectIsSuccess);
  const paymentSettingsStatus = useSelector(selectPaymentSettingsStatus);
  const paywallType = useSelector(selectPaywallType);
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState('');
  const [initEventSent, setInitEventStatus] = useState(false);
  const debouncedEmail = useDebounce(value, 200);
  const placeholder = t('email_placeholder');
  const inputCustomStyles: string = `
    margin-top: 24px;
    
    &::placeholder {
      width: 60%;
    }
  `;
  const submitEmail = () => {
    window?.ttq?.track('Contact', {});
    const eventParams = { email };
    sendEvents(EVENTS.ENTER_EMAIL_SUBMITTED, eventParams);
    dispatch(setEventData(eventParams));
    sendSignupRequest({
      email,
      user_uuid: uuid,
      landing_type: paywallType,
    })(dispatch);
  };

  usePreloadNextPage(nextPage);

  useEffect(() => {
    if (initEventSent) return;
    sendEvents(EVENTS.ENTER_EMAIL_SHOWN);
    setInitEventStatus(true);
  }, [sendEvents, initEventSent]);

  useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(value);
    setIsValid(isEmailValid);
  }, [value]);

  useEffect(() => {
    if (debouncedEmail) {
      dispatch(setEmail({ email: debouncedEmail, isValid }));
    }
  }, [debouncedEmail, isValid, dispatch]);

  useEffect(() => {
    if (isSuccess && paymentSettingsStatus) {
      sendEvents(EVENTS.SIGNUP_SUCCESS);
      window?.ttq?.track('CompleteRegistration', {});
      navigate(nextPage);
    }
  }, [isSuccess, paymentSettingsStatus, navigate, sendEvents, nextPage]);

  return (
    <div className={'scrollable'}>
      <S.Title dangerouslySetInnerHTML={{ __html: t('enter_your_email')}} />
      <SignupInput
        value={value}
        placeholder={placeholder}
        isValid={isValid}
        setValue={setValue}
        submitEmail={submitEmail}
        isArabic={isArabic}
        customStyles={inputCustomStyles}
      />
      <S.PrivacyText>
        <svg className={'lock-icon'} width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' clipRule='evenodd' d='M5.9375 5.7C5.9375 3.54609 7.75634 1.8 10 1.8C12.2437 1.8 14.0625 3.54609 14.0625 5.7V7.2H5.9375V5.7ZM4.0625 7.28424V5.7C4.0625 2.55198 6.72081 0 10 0C13.2792 0 15.9375 2.55198 15.9375 5.7V7.28424C18.2508 7.7055 20 9.65665 20 12V19.2C20 21.851 17.7614 24 15 24H5C2.23858 24 0 21.851 0 19.2V12C0 9.65665 1.74919 7.7055 4.0625 7.28424ZM10 13.5C10.5178 13.5 10.9375 13.9029 10.9375 14.4V16.8C10.9375 17.2971 10.5178 17.7 10 17.7C9.48223 17.7 9.0625 17.2971 9.0625 16.8V14.4C9.0625 13.9029 9.48223 13.5 10 13.5Z' fill='#8696A6'/>
        </svg>
        {t('we_respect')}
      </S.PrivacyText>
      <ReviewsBlock mt={32} />
      <NextButton onClick={submitEmail} disabled={!isEmailValid} {...buttonStyles} />
    </div>
  );
};

export default Signup;
