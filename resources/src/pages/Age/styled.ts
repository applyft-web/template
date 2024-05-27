import styled, { keyframes } from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  white-space: pre-line;
`;

const flashing = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
`;

export const InputWrapper = styled.div<{ $valid: boolean; $focused: boolean }>`
  margin: 20px 0 24px;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme?.colors?.primary};
    animation: ${flashing} ${({ $valid, $focused }) => $valid || $focused ? 0 : 1}s steps(1) infinite;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 50%;
    transform: translateX(50%);
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 48px;
  line-height: 1;
  color: ${({ theme }) => theme?.colors?.text};
  background: none;
  outline: none;
  border: none;
  caret-color: ${({ theme }) => theme?.colors?.primary};
  text-align: center;
  position: relative;
`;

export const Info = styled.div`
  background-color: #404464;
  border-radius: 8px;
  padding: 12px 12px 12px 36px;
  font-size: 12px;
  line-height: 16px;
  color: #C9CCE2;
  text-align: left;
  margin-top: 16px;
  position: relative;
  
  div:first-of-type {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme?.colors?.text};
    margin-bottom: 6px;
  }
  
  .info-icon {
    position: absolute;
    top: 14px;
    left: 12px;
  }
`;
