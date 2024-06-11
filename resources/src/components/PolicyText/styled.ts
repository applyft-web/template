import styled from 'styled-components';

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  background-color: ${({ theme }) => theme?.colors?.bodyBackground};
`;

export const Text = styled.div`
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  color: #72758F;
`;

export const Link = styled.span`
  text-decoration: underline;
  color: #72758F;
`;
