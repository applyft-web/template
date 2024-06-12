import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setShowError, selectError } from '../../core/store/error';
import { Alert as AlertUI } from '@applyft-web/ui-components';

export const Alert = ({ isArabic = false }: { isArabic?: boolean }) => {
  const { t } = useTranslation();
  const { show, message } = useSelector(selectError);
  const dispatch = useDispatch();

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

  return (
    <AlertUI
      show={show}
      message={doesEmailExist ? t('email_exist') : message}
      clearError={clearError}
      isArabic={isArabic}
    />
  )
};
