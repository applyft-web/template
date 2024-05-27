import React from 'react';
import { SimpleQuizPage } from '../../../containers';

const Q17 = () => {
  const titleKey = 'your_brain_percentage';
  const answers = [
    '10-30%',
    '30-60%',
    '60-90%',
    '90-100%',
  ];

  return <SimpleQuizPage {...{ titleKey, answers }} />;
};

export default Q17;
