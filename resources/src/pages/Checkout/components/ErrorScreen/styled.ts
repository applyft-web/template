import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: -50px;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: 100svh;
  height: calc(var(--vh,1svh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme?.colors?.bodyBackground};
  padding: 16px 24px 96px;
  z-index: 1000;
  isolation: isolate;
`;

export const ModalContent = styled.div`
  max-width: ${({ theme }) => theme?.maxContentWidth}px;
`;

export const Img = styled.div`
  width: 147px;
  height: 185px;
  background-image: url(${'../assets/images/payment-declined.png'});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
`;

export const ErrorText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ff5b5b;
  margin-top: 4px;
`;

export const StyledList = styled.ul<{ $isArabic?: boolean }>`
  padding: 0;
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 19px;
  ${({ $isArabic }) => $isArabic && 'direction: rtl;'}

  li {
    margin: ${({ $isArabic }) => $isArabic ? '4px 20px 0 0' : '4px 0 0 20px'};
    position: relative;
    text-align: ${({ $isArabic }) => $isArabic ? 'right' : 'left'};
    
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;
