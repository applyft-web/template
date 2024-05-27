import React from 'react';
import { useTranslation } from 'react-i18next';
import { PotentialProgressBlock } from '../../../components';
import * as S from './styled';

export const ComparisonBlock = () => {
  const { t } = useTranslation();

  const LevelScale = ({ count }: { count: number }) => {
    return (
      <S.LevelScale>
        {[...Array(5)].map((_, index) => (
          <S.LevelScaleItem $active={index < count} key={index} />
        ))}
      </S.LevelScale>
    );
  };

  return (
    <PotentialProgressBlock date1={t('now')} date2={t('your_goal')} mt={0}>
      <S.Comparison>
        <S.ComparisonSegment>
          <S.ComparisonLevel>
            <div>{t('brain_efficient_level')}</div>
            <div>{t('low')}</div>
          </S.ComparisonLevel>
          <S.ComparisonScale>
            <div>{t('beginner')}</div>
            <LevelScale count={1} />
          </S.ComparisonScale>
        </S.ComparisonSegment>
        <S.ComparisonSegment>
          <S.ComparisonLevel>
            <div>{t('brain_efficient_level')}</div>
            <div>{t('high')}</div>
          </S.ComparisonLevel>
          <S.ComparisonScale>
            <div>{t('advanced')}</div>
            <LevelScale count={3} />
          </S.ComparisonScale>
        </S.ComparisonSegment>
      </S.Comparison>
    </PotentialProgressBlock>
  );
};
