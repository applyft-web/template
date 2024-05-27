import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setShowError, selectError } from '../../core/store/error';
import * as S from './styled';

export const Alert = ({ isArabic = false }: { isArabic?: boolean }) => {
  const { t } = useTranslation();
  const { show, message } = useSelector(selectError);
  const dispatch = useDispatch();
  const [clear, setClear] = useState(false);

  const clearError = useCallback(
    () => dispatch(setShowError(false)),
    [dispatch]
  );

  const doesEmailExist =
    ['the email has already been taken', 'useremailtaken']
      .some((str) => message.replace('.','')
        .trim()
        .toLowerCase()
        .includes(str)
      );

  useEffect(() => {
    if (show && !clear) {
      var timer = setTimeout(clearError, 3000);
    }
    return () => {
      setClear(false);
      clearTimeout(timer);
    }
  }, [show, clearError, clear]);

  const onCloseClick = () => {
    setClear(true);
    clearError();
  };

  return (
    <S.StyledAlert $show={show} $isArabic={isArabic} >
      <p>{doesEmailExist ? t('email_exist') : message}</p>
      {show && <S.CloseAlert onClick={onCloseClick}>×</S.CloseAlert>}
    </S.StyledAlert>
  )
};
