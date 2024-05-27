import styled from 'styled-components';

export const Block = styled.div<{ $mt: number }>`
  margin-top: ${({ $mt}) => $mt}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #404464;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 254px;
    background-image: url(${'./assets/images/progress.png'}), radial-gradient(85% 85% at 50% 50%, #333867 26.94%, #3D4263 100%);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 8px;
    order: -1;
  }
`;

export const Dates = styled.div`
  display: flex;
  width: calc(100% - 16px);
  height: 44px;
  margin-top: 8px;
  order: -1;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 50%;
  background-color: ${({ theme }) => theme?.colors?.bodyBackground};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  
  &:first-child {
    border-radius: 12px 0 0 12px;
  }
  
  &:last-child {
    border-radius: 0 12px 12px 0;
    margin-left: 1px;
  }
`;
