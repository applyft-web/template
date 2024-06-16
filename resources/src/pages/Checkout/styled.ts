import styled from 'styled-components';
import { getCssSize } from '@applyft-web/ui-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
`;

export const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 20px;
  cursor: pointer;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme?.colors?.bodyBackground};
  z-index: 1;
`;

export const PaymentRequestContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme?.maxContentWidth}px;
  margin-bottom: 24px;

  div iframe {
    border-radius: 14px;
  }
`;

export const PaymentBlock = styled.div<{ $show: boolean }>`
  margin-top: 20px;
  display: ${({ $show }) => $show ? 'block' : 'none'};
`;

export const Tabs = styled.div`
  margin: 16px auto 0;
  position: relative;
  display: flex;
  overflow-x: auto;
  column-gap: 12px;
  flex-shrink: 0;
`;

export const TabItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 106px;
  height: 75px;
  flex-shrink: 0;
  padding: 0 8px;
  background-color: #404464;
  border: 1px solid ${({ $isActive, theme }) => $isActive ? theme?.colors?.primary : '#5D638F'};
  border-radius: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  letter-spacing: -0.01em;
`;

export const WalletIcon = styled.div<{ $img: string }>`
  width: 90%;
  height: 90%;
  background-image: url(${({ $img }) => `./assets/images/wallets/${$img}.png`});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

interface MarginProps {
  readonly $mt?: number | string;
  readonly $mb?: number | string;
}

export const CardIconsList = styled.div<MarginProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2px;
  ${({ $mt }) => $mt && `margin-top: ${getCssSize($mt)}`};
  ${({ $mb }) => $mb && `margin-bottom: ${getCssSize($mb)}`};
`;
