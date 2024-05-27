import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  white-space: pre-line;
`;

export const Input = styled.input`
  margin: 20px 0 24px;
  padding: 10px 0;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme?.colors?.text};
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #8A8FB2;
  border-radius: 0;
  caret-color: ${({ theme }) => theme?.colors?.primary};
  transition: border-bottom-color .3s;
  text-align: center;
  
  &::placeholder {
    color: #8A8FB2;
  }
  
  &:focus {
    border-bottom-color: ${({ theme }) => theme?.colors?.primary};
  }
`;
