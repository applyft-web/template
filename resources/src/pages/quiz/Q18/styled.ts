import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-top: 10px;
`;

export const Description = styled.div`
  font-size: 18px;
  line-height: 28px;
  margin-top: 8px;
  color: #C9CCE2;
`;

export const Inner = styled.div<{ $isActive: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  
  div:last-child {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: ${({ $isActive }) => $isActive ? '#292C44' : '#C9CCE2'};
    margin-top: 2px;
  }
`;
