import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-top: 10px;
`;

export const Subtitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  color: #C9CCE2;
  margin-top: 8px;
`;

export const List = styled.div`
  margin-top: 24px;
`;

export const ListItem = styled.div`
  padding: 28px 20px 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  row-gap: 12px;
  column-gap: 12px;
  gap: 12px;
  border: 1px solid #5D638F;
  background-color: #404464;
  position: relative;
  
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const ListItemYear = styled.div`
  position: absolute;
  top: 12px;
  left: 24px;
  font-size: 12px;
  line-height: 16px;
  color: #8A8FB2;
`;

export const ListItemPercent = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  color: #C9CCE2;
`;

export const ListItemText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #C9CCE2;
  text-align: left;
`;
