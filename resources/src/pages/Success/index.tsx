import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectDeepLinkUrl } from '../../core/store/signup';
import { useEventNameConstructor, useSendEvents } from '../../core/hooks';
import { EVENTS as E } from '../../core/constants';
import { CheckIcon, ContinueButton, MarketsButton } from '@applyft-web/ui-components';
import * as S from './styled';

const Success = ({ screenId = '' }: { screenId?: string }) => {
  const { t } = useTranslation();
  const sendEvents = useSendEvents({ screenId });
  const getEventName = useEventNameConstructor({ screenId });
  const deepLinkUrl = useSelector(selectDeepLinkUrl);
  const onButtonClick = () => {
    sendEvents(getEventName(E.CLICK), { [E.OR]: 'continue' });
    window.open(deepLinkUrl);
  };
  const steps = [
    t('download'),
    t('login'),
    t('enjoy_your_plan'),
  ];
  const renderSteps = (item: string, index: number) => (
    <S.ListItem key={index}>
      <div>{index+1}</div>
      <div>{item}</div>
    </S.ListItem>
  );

  useEffect(() => {
    sendEvents(getEventName(E.LOAD), { [E.SL]: screenId });
  }, [sendEvents, getEventName, screenId]);

  return (
    <div className={'scrollable'}>
      <S.Header>
        <S.HeaderIcon>
          <CheckIcon customStyles={{svg: 'width:15px;height:11px', path: 'fill: $fff;'}} />
        </S.HeaderIcon>
        <div>{t('success')}</div>
      </S.Header>
      <S.Wrapper>
        <S.Title>{t('access')}</S.Title>
        <S.List>
          {steps.map(renderSteps)}
        </S.List>
        <ContinueButton
          onClick={onButtonClick}
          staticPosition
          mt={24}
        >
          {t('download_app')}
        </ContinueButton>
      </S.Wrapper>
      <S.ButtonsWrapper>
        <MarketsButton marketName={'apple'} onClick={onButtonClick} />
        <MarketsButton marketName={'google'} onClick={onButtonClick} />
      </S.ButtonsWrapper>
    </div>
  );
};

export default Success;
