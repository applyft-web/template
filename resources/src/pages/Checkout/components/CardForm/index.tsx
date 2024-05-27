import React from 'react';
import { getPhrase } from '../phrases';
import { cardBrandsIcons } from '../icons';
import * as S from './styled';

interface CardFormProps {
  card?: any;
  expiration?: any;
  cvc?: any;
  cardholder?: any;
  cardBrand?: string;
  setName: (value: string) => void;
  locale?: string;
}

export const CardForm = ({
  card,
  expiration,
  cvc,
  cardholder,
  cardBrand,
  setName,
  locale = 'en',
}: CardFormProps) => {

  return (
    <S.StyledCardFormWrapper>
      <S.StyledCardForm>
        <S.StyledFieldWrapper>
          <div id={'card-number-element'} ref={card ?? null} />
          {cardBrand && (
            <S.StyledBrandIcon>{cardBrandsIcons[cardBrand]}</S.StyledBrandIcon>
          )}
        </S.StyledFieldWrapper>
        <S.StyledFieldWrapper>
          <div id={'card-expiry-element'} ref={expiration ?? null} />
        </S.StyledFieldWrapper>
        <S.StyledFieldWrapper>
          <div id={'card-cvc-element'} ref={cvc ?? null} />
        </S.StyledFieldWrapper>
        <S.StyledFieldWrapper>
          <S.StyledInput
            id={'cardholder-name-element'}
            ref={cardholder}
            onChange={(e) => setName?.(e.target.value ?? '')}
            type={'text'}
            autoComplete={'cc-name'}
            placeholder={getPhrase('name_on_card', locale)}
          />
        </S.StyledFieldWrapper>
      </S.StyledCardForm>
    </S.StyledCardFormWrapper>
  );
};
