import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q7 = () => {
  const titleKey = 'how_often_you_train';
  const answers = [
    'every_day',
    'once_a_week',
    'once_a_month',
    'once_a_year',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q7;
