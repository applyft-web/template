import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background-color: #404464;
  font-size: 16px;
  line-height: 24px;
`;

export const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #21B049;
  margin-right: 12px;
`;

export const Wrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: 32px 20px;
  background-color: #404464;
  margin-top: 32px;
`;

export const Image = styled.div`
  width: 100%;
  height: 65px;
  background: url(${'./assets/images/logo.png'}) no-repeat center;
  background-size: contain;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  margin-top: 12px;
`;

export const List = styled.div`
  margin-top: 20px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  
  &:not(:first-child) {
    margin-top: 12px;
  }
  
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme?.colors?.bodyBackground};
    margin-right: 16px;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
  column-gap: 5px;
  row-gap: 5px;
  gap: 5px;
  zoom: 0.84;
`;
