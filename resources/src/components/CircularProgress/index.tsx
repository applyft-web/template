import React from 'react';
import * as S from './styled';

export const CircularProgress = ({
  children,
  size = 174,
  progress = 0,
  customStyles,
}: {
  children?: JSX.Element;
  size?: number;
  progress?: number | number[];
  customStyles?: string;
}) => {
  const isSmall = size < 100;

  return (
    <S.ProgressWrapper $size={size} $customStyles={customStyles}>
      {children}
      <S.StyledSvg
        viewBox={`${size/6} ${size/6} ${size/3} ${size/3}`}
        xmlns="http://www.w3.org/2000/svg"
        $size={size}
      >
        {(typeof progress === 'number' ? [progress] : progress).map((el: number, i: number) => (
          <S.StyledCircle
            cx={size / 3}
            cy={size / 3}
            r={size / 6 - (isSmall ? 1 : 2)}
            fill="none"
            strokeWidth={isSmall ? 2 : 4}
            strokeDasharray={`${size}px`}
            strokeDashoffset={`${size * (1 - el/100)}px`}
            key={i}
            $small={isSmall}
          />
        ))}
      </S.StyledSvg>
    </S.ProgressWrapper>
  );
}