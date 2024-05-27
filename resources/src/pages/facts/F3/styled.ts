import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-top: 20px;
`;

export const Subtitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  margin-top: 8px;
  color: #C9CCE2;
`;

export const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 24px;
  color: #8A8FB2;
`;

export const AbilitiesList = styled.div`
  margin-top: 18px;
`;

export const Ability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px 16px 56px;
  position: relative;
  background-size: auto 100%, 100%;
  background-repeat: no-repeat;
  background-position: 100% 0, 0 0;

  &:not(:first-child) {
    margin-top: 2px;
  }
  
  &:nth-child(1) {
    background-image: url(${'./assets/images/arrows.png'}), linear-gradient(90deg, #292C44 14%, #293F46 100%);
  }
  
  &:nth-child(2) {
    background-image: url(${'./assets/images/arrows.png'}), linear-gradient(90deg, #292C44 14%, #294631 100%);
  }
  
  &:nth-child(3) {
    background-image: url(${'./assets/images/arrows.png'}), linear-gradient(90deg, #292C44 14%, #462929 100%);
  }
  
  &:nth-child(4) {
    background-image: url(${'./assets/images/arrows.png'}), linear-gradient(90deg, #292C44 14%, #463E29 100%);
  }
`;

export const AbilityIcon = styled.div<{ $type: string }>`
  width: 32px;
  height: 32px;
  background-image: url(${({ $type }) => `./assets/images/abilities/${$type}.svg`});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  left: 12px;
  top: calc(50% - 16px);
`;

export const AbilityName = styled.div`
  font-size: 18px;
  line-height: 28px;
`;

export const AbilityPercentage = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

export const Note = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 14px;
  color: #8A8FB2;
`;
