import styled from 'styled-components';
import { APP_SIDE_PADDING } from '../../core/constants';

interface StyledLayoutProps {
  readonly $pt?: string | number;
  readonly $pb?: string | number;
  readonly $customStyles?: string;
}

export const StyledLayout = styled.div<StyledLayoutProps>`
  width: 100%;
  height: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding-top: ${({ $pt }) => $pt ? `${+$pt}${typeof $pt === 'number' ? 'px' : ''}` : '16px'};
  padding-right: ${APP_SIDE_PADDING}px;
  padding-bottom: ${({ $pb }) => $pb ? `${+$pb}${typeof $pb === 'number' ? 'px' : ''}` : '16px'};
  padding-left: ${APP_SIDE_PADDING}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme?.tabletMinWidth}px) {
    justify-content: center;
  }

  @media screen and (max-width: ${({ theme }) => theme?.mobileWidth}px) {}

  & > * {
    width: 100%;
  }
  
  ${({ $customStyles }) => $customStyles};
`;
