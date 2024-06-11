import styled from 'styled-components';

export const Percentage = styled.p`
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
  color: ${({ theme }) => theme?.colors?.text};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  
  span {
    font-size: 24px;
  }
`;
