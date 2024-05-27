import React from 'react';
import * as S from './styled';

interface PotentialProgressBlockProps {
  date1: string;
  date2: string;
  children?: React.ReactNode;
  mt?: number;
}

export const PotentialProgressBlock = ({
  date1,
  date2,
  children,
  mt = 24,
}: PotentialProgressBlockProps) => {
  return (
    <S.Block $mt={mt}>
      <S.Dates>
        <S.Date>{date1}</S.Date>
        <S.Date>{date2}</S.Date>
      </S.Dates>
      {children}
    </S.Block>
  );
};
