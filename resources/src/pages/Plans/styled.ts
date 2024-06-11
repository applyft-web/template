import styled from 'styled-components';
import { getCssSize } from '@applyft-web/ui-components';

interface MarginProps {
  readonly $mt?: string | number;
  readonly $mb?: string | number;
}

export const Title = styled.div<MarginProps>`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  text-align: center;
  white-space: pre-line;
  ${({ $mt }) => $mt && `margin-top: ${getCssSize($mt)}`};
  ${({ $mb }) => $mb && `margin-bottom: ${getCssSize($mb)}`};
`;

export const Disclaimer = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #8A8FB2;
  margin-top: 24px;
`;
