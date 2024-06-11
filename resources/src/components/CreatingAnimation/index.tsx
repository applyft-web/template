import React, { useEffect, useState } from 'react';
import { CircularProgress } from '../../components';
import * as S from './styled';

interface CircularProgressProps {
  duration?: number;
  doneCallback?: (a: boolean) => void;
  size?: number;
  customStyles?: string;
}

export const CreatingAnimation = ({
  duration = 5,
  doneCallback,
  size,
  customStyles,
}: CircularProgressProps ) => {
  const [progress, setProgress] = useState(0);
  const timeout = duration * 1000 / 100; // "* convert to milliseconds / 100 for 100%"

  useEffect(() => {
    if (doneCallback && progress === 100) {
      doneCallback(true)
    }
  }, [progress, doneCallback]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      )
    }, timeout);

    return () => clearInterval(timer);
  }, [timeout]);

  return (
    <CircularProgress
      progress={progress}
      size={size}
      customStyles={customStyles}
    >
      <S.Percentage>{progress}<span>%</span></S.Percentage>
    </CircularProgress>
  );
};
