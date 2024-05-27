import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styled';

export const PeopleCount = () => {
  const { t } = useTranslation();
  const getRandomCount = (): number => 980 + Math.round(Math.random()*10);
  const [count, setCount] = useState(getRandomCount());

  useEffect(() => {
    const interval = setInterval(
      () => setCount(getRandomCount()),
      10000
    );

    return () => clearInterval(interval);
  }, []);

  return <S.CountBlock>{t('people_live_count', { count })}</S.CountBlock>;
};
