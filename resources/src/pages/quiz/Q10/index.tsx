import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q10 = () => {
  const titleKey = 'forget_the_names';
  const answers = [
    'yes_often',
    'sometimes',
    'very_rarely',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q10;
