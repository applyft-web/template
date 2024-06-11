import styled from 'styled-components';

export const IconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 8px;
  gap: 8px;
  margin-top: 24px;
`;

export const PaymentIcon = styled.div<{ $img: string }>`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: url(${({ $img }) => `./assets/images/card-brands/${$img}.png`}) center / contain no-repeat;
`;
