import styled from 'styled-components';

export const PlanInfoBlock = styled.div`
  margin-top: 16px;
`;

export const PlanInfoRowGroup = styled.div`
  border-bottom: 1px solid #5D638F;
  padding-bottom: 10px;
  
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const PlanInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Red = styled.div`
  color: #EF5C5C;
`;

export const Bold = styled.div`
  font-weight: 700;
  font-size: 18px;
`;