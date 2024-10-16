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
  useEventNameConstructor,
} from '../../core/hooks';
import { setEventData } from '../../core/store/events';
import { EVENTS as E } from '../../core/constants';
import { ReviewsBlock } from '../../components';
import { ContinueButton, SignupInput } from '@applyft-web/ui-components';

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isArabic = navigator.language.startsWith('ar');

const Signup = ({ screenId = 'signup' }: { screenId?: string }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const nextPage = useNextPageName();
  const sendEvents = useSendEvents({ screenId });
  const getEventName = useEventNameConstructor({ screenId });
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
  const submitEmail = () => {
    window?.ttq?.track('Contact', {});
    const eventParams = { email };
    sendEvents(getEventName(E.CLICK), { [E.BC]: screenId, ...eventParams });
    dispatch(setEventData(eventParams));
    sendSignupRequest({
      email,
      user_uuid: uuid,
      landing_type: paywallType,
    })(dispatch);
  };

  usePreloadNextPage();

  useEffect(() => {
    if (initEventSent) return;
    sendEvents(getEventName(E.LOAD), { [E.SL]: screenId });
    setInitEventStatus(true);
  }, [sendEvents, initEventSent, screenId, getEventName]);

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
      sendEvents(E.LEAD);
      window?.ttq?.track('CompleteRegistration', {});
      navigate(nextPage);
    }
  }, [isSuccess, paymentSettingsStatus, navigate, sendEvents, nextPage]);

  return (
    <div className={'scrollable'}>
      <SignupInput
        value={value}
        placeholder={placeholder}
        isValid={isValid}
        setValue={setValue}
        submitEmail={submitEmail}
        isArabic={isArabic}
      />
      <ReviewsBlock mt={32} />
      <ContinueButton onClick={submitEmail} disabled={!isEmailValid} {...buttonStyles} />
    </div>
  );
};

export default Signup;
