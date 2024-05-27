import styled from 'styled-components';

export const Img = styled.div`
  width: 100%;
  height: 220px;
  background-image: url(${'./assets/images/fact2.png'});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 24px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  margin-top: 20px;
`;

export const Subtitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  margin-top: 8px;
  color: #C9CCE2;
`;
