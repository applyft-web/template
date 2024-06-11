import styled from 'styled-components';

interface ContainerProps {
  readonly $showCheckout: boolean;
  readonly $isPopup?: boolean;
}

export const Container = styled.div``;

export const CheckoutContainer = styled.div<ContainerProps>`
  ${({ theme, $isPopup, $showCheckout }) => $isPopup ? `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    transform: translateY(${$showCheckout ? '0' : '100%'});
    z-index: 100;
    transition: transform .3s, box-shadow .2s;
    background-color: ${theme?.colors?.bodyBackground};
    border-radius: 20px 20px 0 0;
    box-shadow: 0 0 0 110vh rgba(0, 0, 0, ${$showCheckout ? 0.8 : 0});
  ` : `
    height: 100%;
    display: ${$showCheckout ? 'block' : 'none'};
  `};
`;

export const PlanContainer = styled.div<ContainerProps>`
  ${({ $isPopup, $showCheckout }) => $isPopup ? `
  ${$showCheckout && `
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
  `}` : `
    display: ${$showCheckout ? 'none' : 'block'};
  `};
`;
