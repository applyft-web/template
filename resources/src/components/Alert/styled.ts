import styled from 'styled-components';

export const StyledAlert = styled.div<{ $show: boolean; $isArabic: boolean}>`
  width: 90%;
  height: auto;
  max-width: ${({ theme }) => theme?.maxContentWidth}px;
  min-height: 50px;
  padding: 16px 40px 16px 16px;
  border-radius: 8px;
  background-color: #FF5B5B;
  position: absolute;
  left: 50%;
  top: 6%;
  transform: translate(-50%, -20%);
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  text-align: ${({ $isArabic }) => $isArabic ? 'right' : 'left'};
  z-index: 100;
  ${({ $show }) => ($show
    ? `
      opacity: 1;
      visibility: visible; 
    `
    : `
      opacity: 0;
      visibility: hidden;
    `
  )};
  transition: 150ms ease;
`;

export const CloseAlert = styled.div`
  content: '×';
  display: block;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -12px;
  color: #fff;
  line-height: 18px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
`;
