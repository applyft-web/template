import React from 'react';
import * as S from './styled';

interface ProgressBarProps {
  isSegmented?: boolean;
  bg?: string;
  totalCount: number;
  currentRoute: number;
  skipButton?: string;
  [propName: string]: any;
}

export const ProgressBar = ({
  isSegmented = false,
  bg,
  totalCount,
  currentRoute,
  skipButton,
  ...rest
}: ProgressBarProps) => {
  const pages = new Array(totalCount).fill(0);

  const renderProgress = (_: any, i: number) => (
    <S.StyledBarItem
      $isActive={i <= currentRoute}
      $isSegmented={isSegmented}
      key={i}
    />
  );

  return (
    <S.StyledContainer>
      <S.StyledBar $bg={bg}>
        {pages.map(renderProgress)}
      </S.StyledBar>
      {skipButton && <S.StyledSkip onClick={rest?.onContinueClick}>{skipButton}</S.StyledSkip>}
    </S.StyledContainer>
  );
};
