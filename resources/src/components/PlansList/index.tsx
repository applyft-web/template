import React from 'react';
import { theme } from '../../core/theme';
import { CheckIcon } from '@applyft-web/ui-components';
import * as S from './styled';

export interface PlanProps {
  readonly id: string;
  readonly duration: string;
  readonly price: string;
  readonly period: string;
  readonly currencySign: string;
  readonly oldPrice?: string;
  readonly fullPrice?: string;
  readonly oldFullPrice?: string;
  readonly coupon?: string;
  readonly label?: string;
}

interface ListProps {
  activePlan: string;
  plans: PlanProps[];
  onPlanClick: (plan: PlanProps) => void;
  isArabic?: boolean;
  mt?: string | number;
  mb?: string | number;
}

export const PlansList = ({
  activePlan,
  plans,
  onPlanClick,
  isArabic,
  mt,
  mb,
}: ListProps) => {
  const renderPlans = (planInfo: PlanProps, index: number) => {
    const {
      id,
      duration,
      price,
      period,
      oldPrice,
      fullPrice,
      oldFullPrice,
      currencySign = '$',
      label,
    } = planInfo;
    const isActive = id === activePlan;
    const splitPrice = (str: string = '0.00'): string[] => (
      str.split('.')
    );
    const priceWithCurrency = (price: string = '0'): string => (
      `${currencySign}${price}`
    );

    return (
      <S.PlanLi
        $isActive={isActive}
        $isArabic={isArabic}
        $withLabel={!!label}
        data-label={label}
        onClick={() => onPlanClick(planInfo)}
        id={'plan-button-' + (index + 1)}
        key={index}
      >
        <S.StyledPeriod $isArabic={isArabic}>
          <S.PlanCheck $isActive={isActive} $isArabic={isArabic}>
            <CheckIcon customStyles={{path: `fill: ${theme?.colors?.bodyBackground};`}} />
          </S.PlanCheck>
          <S.PlanTitle>
            <div>{duration}</div>
            <S.StyledFullPrice>
              <S.Strike>{priceWithCurrency(oldFullPrice)}</S.Strike> {priceWithCurrency(fullPrice)}
            </S.StyledFullPrice>
          </S.PlanTitle>
        </S.StyledPeriod>
        <S.StyledPriceWrapper>
          <S.OldPrice>{priceWithCurrency(oldPrice)}</S.OldPrice>
          <S.PriceWrapper $isActive={isActive} data-currency={currencySign}>
            <S.Price>{splitPrice(price)[0]}</S.Price>
            <S.SmallItemsWrapper>
              <span>{splitPrice(price)[1] ?? '00'}</span>
              <S.PerDay>{period}</S.PerDay>
            </S.SmallItemsWrapper>
          </S.PriceWrapper>
        </S.StyledPriceWrapper>
      </S.PlanLi>
    );
  };

  return <S.PlansBlock $mt={mt} $mb={mb}>{plans.map(renderPlans)}</S.PlansBlock>;
};
