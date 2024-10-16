import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaymentError, setShowPaymentError } from '../../../../core/store/checkout'
import { ArabicContext } from '../../../../App';
import { ContinueButton } from '@applyft-web/ui-components';
import * as S from './styled';

export const ErrorScreen = ({ clearFields }: { clearFields: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isArabic = useContext(ArabicContext);
  const { message } = useSelector(selectPaymentError);
  const POINTS = ['your_card_balance', 'limits_on_card', 'contact_card_issue'];

  const renderCheckPoints = (point: string) => {
    return <li key={point}>{t(point)}</li>
  };

  const tryAgainClick = () => {
    clearFields();
    dispatch(setShowPaymentError(false));
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <S.Title>{t('payment_declined')}</S.Title>
        <S.ErrorText>{message}</S.ErrorText>
        <S.StyledList $isArabic={isArabic}>{POINTS.map(renderCheckPoints)}</S.StyledList>
      </S.ModalContent>
      <ContinueButton onClick={tryAgainClick} customId={'try-again-button'}>
        {t('try_again')}
      </ContinueButton>
    </S.ModalWrapper>
  )
};
