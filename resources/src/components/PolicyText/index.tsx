import React from 'react';
import { EVENTS as E, POLICY_LINK, TERMS_LINK } from '../../core/constants';
import { useEventNameConstructor, useSendEvents } from '../../core/hooks';
import * as S from './styled';

export const PolicyText = ({ screenId = '' }: { screenId?: string }) => {
  const sendEvents = useSendEvents({ screenId });
  const getEventName = useEventNameConstructor({ screenId });
  const onLinkClick = (type: string) => {
    if (!type) return;
    const links: { [key: string]: string } = {
      terms: TERMS_LINK,
      policy: POLICY_LINK,
    };
    
    sendEvents(getEventName(E.CLICK), { [E.LR]: type })
    window.open(links[type]);
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
