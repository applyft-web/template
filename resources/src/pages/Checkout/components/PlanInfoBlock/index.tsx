import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styled';

interface PlanInfoBlockProps {
  planDetails: {
    currencySymbol: string;
    price: number;
    periodPrice: number;
  };
  couponDetails: {
    price: number;
  };
}

const fallbackPlanDetails = {
  currencySymbol: '$',
  price: 0,
  periodPrice: 0,
};

const PlanInfoBlock = ({
  planDetails,
  couponDetails,
}: PlanInfoBlockProps) => {
  const { t } = useTranslation();
  const { currencySymbol, price: planPrice, periodPrice } = planDetails || fallbackPlanDetails;
  const couponPrice = couponDetails?.price || +Math.abs(planPrice - periodPrice).toFixed(2);
  const percent = couponPrice > 0 ? `${(couponPrice/planPrice).toFixed(2)}%` : '';

  return (
    <S.PlanInfoBlock>
      <S.PlanInfoRowGroup>
        <S.PlanInfoRow>
          <div>{t('personalized_brain_training_plan')}</div>
          <div>{currencySymbol}{planPrice}</div>
        </S.PlanInfoRow>
        {couponPrice > 0 && (
          <S.PlanInfoRow>
            <div>{percent}&nbsp;{t('discount')}</div>
            <S.Red>-{currencySymbol}{couponPrice}</S.Red>
          </S.PlanInfoRow>
        )}
      </S.PlanInfoRowGroup>
      <S.PlanInfoRowGroup>
        <S.PlanInfoRow>
          <S.Bold>{t('total')}:</S.Bold>
          <S.Bold>{currencySymbol}{(planPrice - couponPrice).toFixed(2)}</S.Bold>
        </S.PlanInfoRow>
        {couponPrice > 0 && (
          <S.PlanInfoRow>
            <div></div>
            <S.PlanInfoRow>
              <svg style={{marginRight:2}} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g>
                  <path d='M12.3941 6.07266C12.351 6.0186 12.2986 6.02922 12.2712 6.04025C12.2483 6.04956 12.1956 6.07931 12.2029 6.15388C12.2117 6.24341 12.2166 6.33469 12.2175 6.42522C12.2214 6.80078 12.0708 7.16872 11.8042 7.43469C11.5393 7.69894 11.191 7.84131 10.82 7.83719C10.3133 7.83072 9.89308 7.56644 9.60467 7.07291C9.3662 6.66481 9.47101 6.13847 9.58198 5.58119C9.64692 5.255 9.71408 4.91769 9.71408 4.59666C9.71408 2.097 8.03364 0.654876 7.03195 0.0177202C7.01123 0.00456396 6.99151 -6.10352e-05 6.97405 -6.10352e-05C6.94564 -6.10352e-05 6.92314 0.012189 6.91205 0.019689C6.89055 0.0342515 6.85614 0.067439 6.8672 0.126189C7.25008 2.15938 6.10808 3.38222 4.89902 4.67685C3.65277 6.01131 2.24023 7.52385 2.24023 10.2517C2.24023 13.4213 4.81889 16 7.98851 16C10.5983 16 12.8992 14.1805 13.584 11.5753C14.0509 9.79897 13.5616 7.53622 12.3941 6.07266ZM8.13192 14.773C7.33823 14.8092 6.58342 14.5246 6.00689 13.9733C5.43655 13.4279 5.10942 12.6668 5.10942 11.8852C5.10942 10.4183 5.6703 9.34138 7.17886 7.91175C7.20355 7.88835 7.22883 7.88094 7.25086 7.88094C7.27083 7.88094 7.28814 7.88703 7.30005 7.89275C7.32514 7.90484 7.36639 7.93478 7.36083 7.99953C7.30689 8.62719 7.30783 9.14816 7.36358 9.54803C7.50608 10.5694 8.2538 11.2557 9.22426 11.2557C9.70008 11.2557 10.1533 11.0767 10.5005 10.7515C10.5407 10.7138 10.5857 10.7186 10.603 10.7222C10.6258 10.7272 10.6564 10.7412 10.6725 10.7798C10.8164 11.1273 10.89 11.4963 10.8911 11.8762C10.8957 13.4051 9.65792 14.7047 8.13192 14.773Z' fill='#EF5C5C'/>
                </g>
              </svg>
              <S.Red>{t('you_just_saved')}&nbsp;{currencySymbol}{couponPrice}&nbsp;({percent})</S.Red>
            </S.PlanInfoRow>
          </S.PlanInfoRow>
        )}
      </S.PlanInfoRowGroup>
    </S.PlanInfoBlock>
  );
};

export default PlanInfoBlock;
