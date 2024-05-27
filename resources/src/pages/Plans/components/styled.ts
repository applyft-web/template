import styled from 'styled-components';
import { APP_SIDE_PADDING } from '../../../core/constants';

export const Comparison = styled.div`
  display: flex;
  width: 100%;
`;

export const ComparisonSegment = styled.div`
  padding: 0 12px;
  flex: 1 0 50%;
  
  &:last-child {
    border-left: 1px solid ${({ theme }) => theme?.colors?.bodyBackground};
  }
`;

export const ComparisonLevel = styled.div`
  width: 100%;
  padding: 12px 0;
  font-size: 12px;
  line-height: 16px;
  color: #C9CCE2;
  text-align: left;
  
  div:last-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
`;

export const ComparisonScale = styled.div`
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme?.colors?.bodyBackground};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
`;

export const LevelScale = styled.div`
  display: flex;
  margin-top: 8px;
  border-radius: 100px;
`;

export const LevelScaleItem = styled.div<{ $active: boolean }>`
  width: 24px;
  height: 4px;
  border-radius: 100px;
  background-color: ${({ theme, $active }) => theme?.colors?.[$active ? 'primary' : 'bodyBackground']};
  
  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const Steps = styled.div`
  margin-top: 16px;
`;

export const StepsItem = styled.div<{ $img: string }>`
  border: 1px solid #5D638F;
  background-color: #404464;
  border-radius: 12px;
  padding: 16px 12px 16px 70px;
  position: relative;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  text-align: left;

  &:not(:first-child) {
    margin-top: 8px;
  }
  
  &:before {
    content: '';
    display: block;
    width: 42px;
    height: 42px;
    background: url(${({ $img }) => `./assets/images/steps/${$img}.svg`}) center / contain no-repeat;
    position: absolute;
    left: 12px;
    top: 16px;
  }
`;

export const StepTitle = styled.div``;

export const StepDescription = styled.div`
  margin-top: 4px;
  font-weight: 300;
  font-size: 14px;
  text-align: left;
  color: #C9CCE2;
`;

export const CountBlock = styled.div`
  width: auto;
  padding: 12px 16px 12px 28px;
  background-color: #404464;
  border: 1px solid #5D638F;
  border-radius: 12px;
  margin-top: 24px;
  font-size: 14px;
  line-height: 18px;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #EF5C5C;
    box-shadow: 0 0 0 4px rgba(222,77,77,.2);
    position: absolute;
    top: 50%;
    left: 16px;
    margin-top: -4px;
  }
`;

export const MoneyBackBlock = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: 24px 16px;
  background-color: #404464;
  border: 1px solid #5D638F;
  margin: 56px 0 60px;
  position: relative;
  text-align: left;

  &:before {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: url(${'./assets/images/guarantee.png'}) center / contain no-repeat;
    position: absolute;
    bottom: 24px;
    right: 16px;
  }
`;

export const MoneyBackTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

export const MoneyBackText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #C9CCE2;
  margin-top: 16px;
  white-space: pre-line;
  
  &:last-child {
    font-size: 12px;
    line-height: 16px;
  }
  
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const IconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 8px;
  gap: 8px;
  margin-top: 24px;
`;

export const PaymentIcon = styled.div<{ $img: string }>`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: url(${({ $img }) => `./assets/images/card-brands/${$img}.png`}) center / contain no-repeat;
`;

export const SliderWrapper = styled.div`
  margin-top: 24px;
  position: relative;
`;

export const Slider = styled.div`
  width: calc(100% + (${APP_SIDE_PADDING}*2px));
  position: relative;
  top: 0;
  left: -${APP_SIDE_PADDING}px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  column-gap: 20px;
`;

export const SliderItem = styled.div<{ $img: string, $active: boolean, $activeSlide: number }>`
  width: ${({ $active }) => $active ? 200 : 160}px;
  height: ${({ $active }) => $active ? 433 : 346}px;
  background: url(${({ $img }) => `./assets/images/slider/${$img}.png`}) center / cover no-repeat;
  flex-shrink: 0;
  transition: opacity .3s;
  border-radius: 24px;
  box-shadow: 0 0 0 4.44px #11163D;
  
  &:nth-child(1) {
    order: ${({ $activeSlide }) => $activeSlide === 1 ? 2 : $activeSlide === 2 ? 1 : 3};
  }
  
  &:nth-child(2) {
    order: ${({ $activeSlide }) => $activeSlide === 2 ? 2 : $activeSlide === 3 ? 1 : 3};
  }
  
  &:nth-child(3) {
    order: ${({ $activeSlide }) => $activeSlide === 3 ? 2 : $activeSlide === 1 ? 1 : 3};
  }
`;

export const SliderControls = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 11px;
  margin-top: 16px;
  
  .arrow {
    cursor: pointer;
    
    &:last-child {
      transform: rotate(180deg);
    }
  }
`;

export const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const SliderDot = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => $active ? '20px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, $active }) => $active ? theme?.colors?.primary : '#8A8FB2'};
  cursor: pointer;
  transition: .3s;
  
  &:not(:first-child) {
    margin-left: 6px;
  }
`;
