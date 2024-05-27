import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q9 = () => {
  const titleKey = 'ever_find_yourself_unable';
  const answers = [
    'yes_often',
    'sometimes',
    'very_rarely',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q9;
