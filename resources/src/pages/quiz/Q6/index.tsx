import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q6 = () => {
  const titleKey = 'have_there_been_instances';
  const answers = [
    'yes_often',
    'sometimes',
    'very_rarely',
    'never',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q6;
