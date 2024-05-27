import styled, { keyframes } from 'styled-components';

export const spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div<{ $transparent: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  ${({ $transparent }) => !$transparent && 'background-color: rgba(0,0,0,.3)'};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const StyledSVG = styled.svg<{ $fill: string }>`
  width: 48px;
  height: 48px;
  animation: ${spinning} 1.5s linear infinite;
    
  circle {
    fill: ${({ $fill, theme }) => theme?.colors?.primary ?? $fill};
  }
`;

export const Message = styled.span`
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  white-space: break-spaces;
  margin-top: 32px;
`;
