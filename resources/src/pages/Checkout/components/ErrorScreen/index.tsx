import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaymentError, setShowPaymentError } from '../../../../core/store/checkout'
import { EVENTS } from '../../../../core/constants'
import { useSendEvents } from '../../../../core/hooks';
import { ArabicContext } from '../../../../App';
import { ContinueButton } from '@applyft-web/ui-components';
import * as S from './styled';

const ErrorScreen = ({ clearFields }: { clearFields: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sendEvents = useSendEvents();
  const isArabic = useContext(ArabicContext);
  const { message } = useSelector(selectPaymentError);
  const POINTS = ['your_card_balance', 'limits_on_card', 'contact_card_issue'];

  const renderCheckPoints = (point: string) => {
    return <li key={point}>{t(point)}</li>
  };

  const tryAgainClick = () => {
    clearFields();
    dispatch(setShowPaymentError(false));
    sendEvents(EVENTS.DECLINE_TRY_AGAIN);
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <S.Img />
        <S.Title>{t('payment_declined')}</S.Title>
        <S.ErrorText>{message}</S.ErrorText>
        <S.StyledList $isArabic={isArabic}>{POINTS.map(renderCheckPoints)}</S.StyledList>
      </S.ModalContent>
      <ContinueButton
        onClick={tryAgainClick}
        customId={'try-again-button'}
        customStyles={'color:#292C44;'}
      >
        {t('try_again')}
      </ContinueButton>
    </S.ModalWrapper>
  )
};

export default ErrorScreen