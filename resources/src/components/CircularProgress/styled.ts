import styled from 'styled-components';

interface ProgressWrapperProps {
  $size: number;
  $customStyles?: string;
}

export const ProgressWrapper = styled.div<ProgressWrapperProps>`
  ${({ $size }) => $size && `
    width: ${$size}px;
    height: ${$size}px;
  `};
  box-shadow: inset 0 0 0 12px #404464;
  border-radius: 50%;
  position: relative;
  ${({ $customStyles }) => $customStyles}
`;

export const StyledSvg = styled.svg<{ $size: number }>`
  stroke: ${({ theme }) => theme?.colors?.primary};
  stroke-linecap: round;
  ${({ $size }) => `
    width: ${$size}px;
    height: ${$size}px;
    top: calc(50% - ${$size/2}px);
    left: calc(50% - ${$size/2}px);
  `};
  position: absolute;
  transform: rotate(-90deg);
`;

export const StyledCircle = styled.circle<{ $small: boolean }>`
  transition: stroke-dashoffset 300ms linear 0ms;
  opacity: .38;

  &:first-child {
    opacity: 1;
    ${({ $small }) => $small ? 'transition-delay: 100ms' : ''};
  }
`;
