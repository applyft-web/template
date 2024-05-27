import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q13 = () => {
  const titleKey = 'how_long_solved';
  const answers = [
    'few_months_ago',
    'few_years_ago',
    'year_ago',
    'solve_regularly',
    'hard_to_remember',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q13;
