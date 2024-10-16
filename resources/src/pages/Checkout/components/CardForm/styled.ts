import styled from 'styled-components';

interface CommonProps {
  readonly $isArabic?: boolean;
}

export const StyledCardFormWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme?.maxContentWidth}px;
  border-radius: 20px;
  position: relative;
  z-index: 10;
  margin: 0;

  & > * {
    position: relative;
    z-index: 10;
  }
`;

export const StyledCardForm = styled.div`
  width: 100%;
  min-height: 124px;
  border-radius: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  position: relative;
  z-index: 10;

  & > * {
    position: relative;
    z-index: 10;
  }
`;

export const StyledFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 54px;
  background: ${({ theme }) => theme?.colors?.inputBg};
  border: 1px solid #d4dae0;
  border-radius: 12px;
  padding: 0 12px;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:nth-child(2),
  &:nth-child(3) {
    width: calc(50% - 10px);
  }
`;

export const StyledInput = styled.input<CommonProps>`
  width: 100%;
  height: 28px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme?.colors?.text};
  background-color: transparent;
  border: none;
  text-align: ${({ $isArabic }) => $isArabic ? 'right' : 'left'};

  &::-webkit-credit-card-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
  }

  &::placeholder {
    color: #8696A6;
    letter-spacing: 1.2px;
    font-size: 16px;
    line-height: 22px;
  }

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

export const StyledBrandIcon = styled.div<CommonProps>`
  position: absolute;
  ${({ $isArabic }) => $isArabic ? 'left' : 'right'}: 12px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
