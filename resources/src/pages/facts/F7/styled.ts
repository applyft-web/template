import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  white-space: pre-line;
  margin-top: 10px;
  
  span {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const Diagram = styled.div`
  --diagram-vertical-padding: 20px;
  --diagram-horisontal-padding: 8px;
  --diagram-width: 343;
  --diagram-height: 272;
  --tooltip-border-size: 5px;
  aspect-ratio: var(--diagram-width) / var(--diagram-height);
  margin-top: 24px;
  width: 100%;
  border: 1px solid #5D638F;
  border-radius: 12px;
  background-color: #404464;
  background-image: url(${"./assets/images/diagram.png"});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--diagram-vertical-padding) var(--diagram-horisontal-padding);
  position: relative;
`;

export const DiagramItem = styled.div`
  width: 100%;
  height: calc((100% + var(--diagram-vertical-padding)*2) * 0.185);
  border-top: 1px dashed #fff;
  
  &:nth-child(3) {
    border-bottom: 1px dashed #fff;
  }
`;

export const Weeks = styled.div`
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: calc((26/272) * 100%);
  left: 8px;
  
  div {
    flex: 1 0 25%;
    font-size: 12px;
    line-height: 16px;
    color: #C9CCE2;
    text-align: center;
    text-transform: capitalize;
  }
`;

export const Tooltip1 = styled.div`
  padding: 9px 8px;
  position: absolute;
  bottom: calc((100/var(--diagram-height)) * 100%);
  left: calc((21/var(--diagram-width)) * 100%);
  background-color: #515684;
  border-radius: 4px;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: calc(50% - var(--tooltip-border-size));
    border: var(--tooltip-border-size) solid transparent;
    border-top-color: #515684;
  }
`;

export const Tooltip2 = styled.div`
  padding: 4px 8px;
  position: absolute;
  top: calc((20/var(--diagram-height)) * 100%);
  right: calc((47/var(--diagram-width)) * 100%);
  background-color: ${({ theme }) => theme?.colors?.primary};
  border-radius: 4px;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  white-space: pre-line;
  color: ${({ theme }) => theme?.colors?.bodyBackground};
  
  &:after {
    content: '';
    position: absolute;
    top: calc(50% - var(--tooltip-border-size));
    left: 100%;
    border: var(--tooltip-border-size) solid transparent;
    border-left-color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const Note = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #8A8FB2;
  margin: 20px 0;
`;
