import styled from 'styled-components';

export const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  white-space: pre-line;
  margin-top: 20px;

  .highlighted {
    color: ${({ theme }) => theme?.colors?.primary};
  }
`;

export const Subtitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  white-space: pre-line;
  margin-top: 8px;
  color: #C9CCE2;
`;

export const Image = styled.div<{ $type: string }>`
  margin-top: 24px;
  width: 100%;
  height: 100%;
  background-image: url(${({ $type }) => `./assets/images/age-group/${$type}.png`});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
`;
