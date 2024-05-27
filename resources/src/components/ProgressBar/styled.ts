import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  max-width: ${({ theme }) => theme?.maxContentWidth}px;
  height: 20px;
  position: fixed;
  top: 16px;
`;

export const StyledSkip = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-left: 20px;
  cursor: pointer;

  @media screen and (min-width: ${({ theme }) => theme?.tabletMinWidth}px) and (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

interface StyledBarProps {
  readonly $bg?: string;
}

export const StyledBar = styled.div<StyledBarProps>`
  display: flex;
  flex: 1 0 auto;
  height: 8px;
  border-radius: 20px;
  background: ${({ $bg, theme }) => $bg || theme?.colors?.progressBarBg || '#fff'};
  overflow: hidden;
`;

interface StyledBarItemProps {
  readonly $isActive: boolean;
  readonly $isSegmented: boolean;
}

export const StyledBarItem = styled.div<StyledBarItemProps>`
  flex-grow: 1;
  background-color: ${({ theme, $isActive }) => theme?.colors?.[`progressBar${$isActive ? 'Active' : ''}`]};
  transition: background-color 300ms;

  ${({ $isSegmented }) => $isSegmented && `
    border-radius: 14px;
    &:not(:first-child) {
      margin-left: 5px;
    }
  `}
`;
