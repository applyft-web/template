import React from 'react';
import {
  WelcomeScreen,
  Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18,
  F1, F2, F3, F4, F5, F6, F7,
  QuizResults,
  CreatingProfile,
  Signup, Age, Name,
  PlansCheckout,
  Success,
  type LazyComponentWithPreload,
} from './lazyComponents';
import { landingTypesList } from './landingTypes';
import { theme } from '../theme';

export const defaultFlow: string[] = [
  '/',
  '/f1',
  '/q2',
  '/q3',
  '/f2',
  '/q4',
  '/q5',
  '/f3',
  '/q6',
  '/q7',
  '/q8',
  '/q9',
  '/q10',
  '/f4',
  '/q11',
  '/q12',
  '/q13',
  '/q14',
  '/q15',
  '/q16',
  '/q17',
  '/age',
  '/quiz-results',
  '/q18',
  '/f5',
  '/creating-profile',
  '/signup',
  '/f6',
  '/name',
  '/f7',
  '/checkout',
  '/success',
];

export interface configProps {
  readonly component: LazyComponentWithPreload<React.ComponentType<any>>;
  readonly images?: string[];
}

export const pagesConfig: { [key: string]: configProps } = {
  ...landingTypesList.reduce((obj: { [key: string]: any }, type: string) => {
    obj[type] = {
      component: WelcomeScreen,
      images: [
        './assets/images/adult.png',
        './assets/images/middle.png',
        './assets/images/senior.png',
        './assets/images/young.png',
        './assets/images/header-logo.png',
      ],
    };
    return obj;
  }, {}),
  '/q2': {
    component: Q2,
  },
  '/q3': {
    component: Q3,
  },
  '/q4': {
    component: Q4,
  },
  '/q5': {
    component: Q5,
  },
  '/q6': {
    component: Q6,
  },
  '/q7': {
    component: Q7,
  },
  '/q8': {
    component: Q8,
  },
  '/q9': {
    component: Q9,
  },
  '/q10': {
    component: Q10,
  },
  '/q11': {
    component: Q11,
  },
  '/q12': {
    component: Q12,
  },
  '/q13': {
    component: Q13,
  },
  '/q14': {
    component: Q14,
  },
  '/q15': {
    component: Q15,
  },
  '/q16': {
    component: Q16,
  },
  '/q17': {
    component: Q17,
  },
  '/q18': {
    component: Q18,
  },
  '/f1': {
    component: F1,
    images: [
      './assets/images/age-group/adult.png',
      './assets/images/age-group/middle.png',
      './assets/images/age-group/senior.png',
      './assets/images/age-group/young.png',
    ],
  },
  '/f2': {
    component: F2,
    images: [
      './assets/images/fact2.png',
    ],
  },
  '/f3': {
    component: F3,
    images: [
      './assets/images/abilities/attention.svg',
      './assets/images/abilities/creativity.svg',
      './assets/images/abilities/memory.svg',
      './assets/images/abilities/problem_solving.svg',
      './assets/images/arrows.png',
    ],
  },
  '/f4': {
    component: F4,
  },
  '/f5': {
    component: F5,
    images: [
      './assets/images/progress.png',
    ],
  },
  '/f6': {
    component: F6,
    images: [
      './assets/images/gift.png',
    ],
  },
  '/f7': {
    component: F7,
    images: [
      './assets/images/diagram.png',
    ],
  },
  '/quiz-results': {
    component: QuizResults,
    images: [
      './assets/images/quiz-results-bg.png',
      './assets/images/choices/you_prefer_discover.svg',
      './assets/images/choices/your_age.svg',
      './assets/images/choices/your_goal.svg',
      './assets/images/choices/your_potential_boost.svg',
    ],
  },
  '/creating-profile': {
    component: CreatingProfile,
    images: [
      './assets/images/reviewers/review_1.png',
      './assets/images/reviewers/review_2.png',
      './assets/images/reviewers/review_3.png',
      './assets/images/reviewers/review_4.png',
      './assets/images/reviewers/review_5.png',
      './assets/images/reviewers/review_6.png',
    ],
  },
  '/name': {
    component: Name,
  },
  '/age': {
    component: Age,
  },
  '/signup': {
    component: Signup,
  },
  '/checkout': {
    component: PlansCheckout,
    images: [
      './assets/images/card-brands/amex.png',
      './assets/images/card-brands/discover.png',
      './assets/images/card-brands/mastercard.png',
      './assets/images/card-brands/visa.png',
      './assets/images/card-brands/maestro.png',
      './assets/images/card-brands/paypal.png',
      './assets/images/card-brands/apple.png',
      './assets/images/card-brands/google.png',
      './assets/images/steps/step_1.svg',
      './assets/images/steps/step_2.svg',
      './assets/images/steps/step_3.svg',
      './assets/images/slider/screen-1.png',
      './assets/images/slider/screen-2.png',
      './assets/images/slider/screen-3.png',
      './assets/images/guarantee.png',
      './assets/images/wallets/applePay.png',
      './assets/images/wallets/googlePay.png',
      './assets/images/payment-declined.png',
    ],
  },
  '/success': {
    component: Success,
    images: [
      './assets/images/logo.png',
    ],
  },
};

export interface routesProps {
  readonly path: string;
  readonly element: React.JSX.Element;
  readonly withoutWrap?: boolean;
  readonly withButton?: boolean;
  readonly withBottomText?: boolean;
  readonly wrapperCustomStyles?: string;
}

const pagesWithoutFixedButton = [
  ...landingTypesList,
  '/q2', '/q5', '/q6', '/q7', '/q8', '/q9', '/q10', '/q11', '/q12', '/q13', '/q14', '/q17', '/q18',
  '/creating-profile', '/checkout', '/success',
];

export const pagesRoutes: routesProps[] = Object.keys(pagesConfig).map((path) => {
  const customStyles: { [key: string]: string } = {
    '/checkout': `
      @media screen and (min-width: ${theme?.tabletMinWidth}px) {
        justify-content: flex-start;
      }
    `,
    '/f6': 'padding-bottom: 124px;',
    '/creating-profile': 'justify-content: space-between;',
  };
  const withButton = !pagesWithoutFixedButton.includes(path);
  const withBottomText = [...landingTypesList].includes(path);
  const withoutWrap = false;
  const wrapperCustomStyles = customStyles[path] || '';
  const Comp = pagesConfig[path].component;

  return {
    path,
    element: <Comp />,
    withButton,
    withBottomText,
    withoutWrap,
    wrapperCustomStyles,
  };
});
