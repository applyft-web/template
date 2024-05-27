import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  white-space: pre-line;
  margin-top: 10px;
  
  span {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const Description = styled.div`
  font-size: 18px;
  line-height: 28px;
  margin-top: 8px;
  color: #C9CCE2;
`;
