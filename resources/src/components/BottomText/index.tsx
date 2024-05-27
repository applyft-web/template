import React from 'react';
import { EVENTS, POLICY_LINK, TERMS_LINK } from '../../core/constants';
import { useSendEvents } from '../../core/hooks';
import * as S from './styled';

export const BottomText = () => {
  const sendEvents = useSendEvents();
  const onLinkClick = (type: string) => {
    if (!type) return;
    const links: {[key: string]: {[key: string]: string}} = {
      terms: {
        event: EVENTS.TERMS_TAP,
        url: TERMS_LINK,
      },
      policy: {
        event: EVENTS.POLICY_TAP,
        url: POLICY_LINK,
      },
    };

    sendEvents(links[type].event);
    window.open(links[type].url);
  };

  return (
    <S.TextBlock>
      <S.Text>7006 STANFORD AVE, LOS ANGELES, CA 90001-1583, USA</S.Text>
      <S.Text>
        <S.Link onClick={() => onLinkClick('terms')}>Terms & Conditions</S.Link> & <S.Link onClick={() => onLinkClick('policy')}>Privacy Policy</S.Link>
      </S.Text>
    </S.TextBlock>
  );
};
