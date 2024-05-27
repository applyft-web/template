import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  white-space: pre-line;
  margin-top: 20px;
  
  span {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const Img = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 50px;
  background: url(${'./assets/images/gift.png'}) no-repeat center;
  background-size: contain;
`;

export const Refusal = styled.div`
  width: 100%;
  padding: 16px 0 20px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #8A8FB2;
  position: fixed;
  bottom: 0;
  left: 0;
`;
