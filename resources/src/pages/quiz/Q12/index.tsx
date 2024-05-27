import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q12 = () => {
  const titleKey = 'how_long_studied';
  const answers = [
    'few_years_ago',
    'year_ago',
    'few_months_ago',
    'study_regularly',
    'hard_to_remember',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q12;
