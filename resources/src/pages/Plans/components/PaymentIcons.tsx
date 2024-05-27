import React from 'react';
import * as S from './styled';

export const PaymentIcons = () => {
  const icons = [
    'visa',
    'mastercard',
    'amex',
    'discover',
    'apple',
    'google',
    'maestro',
    'paypal',
  ];
  const renderIcons = (icon: string) => {
    return <S.PaymentIcon $img={icon} key={icon} />;
  };

  return (
    <S.IconsWrapper>
      {icons.map(renderIcons)}
    </S.IconsWrapper>
  );
};
