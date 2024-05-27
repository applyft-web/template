import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  white-space: pre-line;
  
  span {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const PrivacyText = styled.div`
  padding-left: 28px;
  font-size: 12px;
  line-height: 14px;
  color: #8696A6;
  text-align: left;
  margin-top: 20px;
  position: relative;
  
  .lock-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;
