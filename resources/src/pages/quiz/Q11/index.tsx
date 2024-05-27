import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q11 = () => {
  const titleKey = 'when_you_feel';
  const answers = [
    'less_year_ago',
    'two_years_ago',
    'three_years_ago',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q11;
