import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-top: 10px;
`;

export const Block = styled.div`
  padding: 12px 16px 20px;
  margin-top: 24px;
  background-color: #404464;
  border: 1px solid #5D638F;
  border-radius: 12px;
`;

export const Ages = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AgeItem = styled.div<{ $isSelected: boolean }>`
  width: 22%;
  flex-shrink: 0;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme, $isSelected }) => $isSelected ? theme?.colors?.primary : '#858BB9'};
  white-space: nowrap;


  &:first-child {
    margin-left: 0;
  }

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 9px;
    border-radius: 48px;
    background-color: ${({ theme, $isSelected }) => $isSelected ? theme?.colors?.primary : '#858BB9'};
    margin-bottom: 5px;
  }
`;

export const Levels = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 374px) {
    width: 90%;
    margin: 16px auto 0;
  }
`;

export const LevelsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;

  span {
    margin-top: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const ProgressValue = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme?.colors?.primary};
  white-space: nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Note = styled.div`
  background-color: ${({ theme }) => theme?.colors?.bodyBackground};
  padding: 12px;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  color: #C9CCE2;
  border-radius: 8px;
  margin-top: 24px;
  
  div:first-child {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme?.colors?.text};
  }
`;

export const Choices = styled.div`
  margin-top: 16px;
`;

export const ChoicesItem = styled.div<{ $image: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 42px;
  padding-left: 50px;
  font-size: 12px;
  line-height: 14px;
  text-align: left;
  white-space: pre-line;
  z-index: 1;

  &:not(:first-child) {
    margin-top: 16px;
  }

  &:before {
    content: '';
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 5px;
    background: #858BB9 ${({ $image }) => `url('./assets/images/choices/${$image}.svg')`} center no-repeat;
    position: absolute;
    top: calc(50% - 21px);
    left: 0;
  }

  div:last-child {
    font-weight: 700;
    color: ${({ theme }) => theme?.colors?.primary};
    margin-top: 2px;
  }
`;

export const BackgroundImage = styled.div`
  position: relative;
  isolation: isolate;

  &:before {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -16px;
    width: 192px;
    height: 224px;
    background-image: url(${'./assets/images/quiz-results-bg.png'});
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
  }
`;
