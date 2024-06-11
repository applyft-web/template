import React from 'react';
import {
  WelcomeScreen,
  QuestionExample,
  CreatingProfile,
  Signup,
  PlansCheckout,
  Success,
  type LazyComponentWithPreload,
} from './lazyComponents';
import { landingTypesList } from './landingTypes';
import { theme } from '../theme';

export const defaultFlow: string[] = [
  '/',
  '/q',
  '/creating-profile',
  '/signup',
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
    };
    return obj;
  }, {}),
  '/q': {
    component: QuestionExample,
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
  readonly withPolicyText?: boolean;
  readonly wrapperCustomStyles?: string;
}

const pagesWithoutFixedButton = ['/creating-profile', '/checkout', '/success'];

export const pagesRoutes: routesProps[] = Object.keys(pagesConfig).map((path) => {
  const customStyles: { [key: string]: string } = {
    '/checkout': `
      @media screen and (min-width: ${theme?.tabletMinWidth}px) {
        justify-content: flex-start;
      }
    `,
    '/creating-profile': 'justify-content: space-between;',
  };
  const componentsProps: { [key: string]: object } = {
    '/checkout': {
      popupStyle: true,
    },
    '/signup': {
      awesomeProp: '(no)',
    },
  };
  const withButton = !pagesWithoutFixedButton.includes(path);
  const withPolicyText = [...landingTypesList].includes(path);
  const withoutWrap = false;
  const wrapperCustomStyles = customStyles[path] || '';
  const Comp = pagesConfig[path].component;

  return {
    path,
    element: <Comp {...componentsProps[path]} />,
    withButton,
    withPolicyText,
    withoutWrap,
    wrapperCustomStyles,
  };
});
