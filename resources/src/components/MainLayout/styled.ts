import styled from 'styled-components';
import { theme } from '../../core/theme';
import { getCssSize } from '@applyft-web/ui-components';

const APP_SIDE_PADDING = theme?.sidePadding || 16;

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
  ${({ $pt }) => $pt && `padding-top: ${getCssSize($pt)}`};
  padding-right: ${APP_SIDE_PADDING}px;
  ${({ $pb }) => $pb && `padding-bottom: ${getCssSize($pb)}`};
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
