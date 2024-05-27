import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styled';

export const Steps = () => {
  const { t } = useTranslation();
  const steps = new Array(3).fill('');
  const renderSteps = (step: any, index: number) => {
    const number = ++index;
    const img = `step_${number}`;
    return (
      <S.StepsItem $img={img} key={number}>
        <S.StepTitle>{t(`${img}_title`)}</S.StepTitle>
        <S.StepDescription>{t(`${img}_description`)}</S.StepDescription>
      </S.StepsItem>
    );
  };

  return (
    <S.Steps>{steps.map(renderSteps)}</S.Steps>
  );
};
