import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  white-space: pre-line;
  
  span {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;
