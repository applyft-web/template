import styled from 'styled-components';

export const HeaderLogo = styled.div`
  width: 100%;
  height: 42px;
  background: ${({ theme }) => theme?.colors?.bodyBackground} url(${'./assets/images/header-logo.png'}) center no-repeat;
  background-size: auto 26px;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  white-space: pre-line;
  margin-top: 46px;
`;

export const Subtitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  white-space: pre-line;
  margin-top: 8px;
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  margin-top: 24px;
`;

export const OptionsItem = styled.div<{ $type: string }>`
  aspect-ratio: 165/180;
  border-radius: 12px;
  background-color: ${({ theme }) => theme?.colors?.optionInactive};
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    ${({ $type }) => `background-image: url("./assets/images/age/${$type}.png")`};
    background-position: top center;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  @media screen and (min-width: ${({ theme }) => theme?.desktopMinWidth}px) {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const OptionsItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 8px);
  height: 44px;
  border-radius: 8px;
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: ${({ theme }) => theme?.colors?.primary};
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme?.colors?.bodyBackground};
  text-align: center;

  .icon {
    margin-left: 8px;
  }
`;
