import React from 'react';
import { useTranslation } from 'react-i18next';
import { EVENTS, PAYMENT_POLICY_LINK } from '../../../core/constants';
import { useSendEvents } from '../../../core/hooks';
import * as S from './styled';

export const GuaranteeBlock = () => {
  const { t } = useTranslation();
  const sendEvents = useSendEvents();
  const onTextClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = (e.target as HTMLElement).id;
    const isPolicy = id === 'policy';

    if (!isPolicy) return;
    sendEvents(EVENTS.PAYMENT_POLICY_TAP);
    window.open(PAYMENT_POLICY_LINK, '_blank');
  };

  return (
    <S.MoneyBackBlock>
      <S.MoneyBackTitle>{t('money_back')}</S.MoneyBackTitle>
      <S.MoneyBackText>{t('money_back_text')}</S.MoneyBackText>
      <S.MoneyBackText dangerouslySetInnerHTML={{ __html: t('money_back_policy') }} onClick={onTextClick} />
      <S.MoneyBackText>{'7006 STANFORD AVE, LOS ANGELES,\nCA 90001-1583, USA'}</S.MoneyBackText>
    </S.MoneyBackBlock>
  );
};
