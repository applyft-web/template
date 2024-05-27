import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q14 = () => {
  const titleKey = 'experienced_the_inability';
  const answers = [
    'yes_often',
    'sometimes',
    'very_rarely',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q14;
