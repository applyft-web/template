import React from 'react';
import * as LC from './lazyComponents';
import { landingTypesList } from './landingTypes';
import { MainLayoutCustomStylesWithStatesProps } from '@applyft-web/ui-components';

export interface CommonProps {
  readonly withButton?: boolean;
  readonly withoutWrap?: boolean;
  readonly withPolicyText?: boolean;
  readonly wrapperProps?: {
    adaptive?: boolean;
    customStyles?: MainLayoutCustomStylesWithStatesProps
  };
}

export interface ConfigProps extends CommonProps {
  readonly component: LC.LazyComponentWithPreload<React.ComponentType<any>>;
  readonly images?: string[];
  readonly componentProps?: object;
}

export const pagesConfig: { [key: string]: ConfigProps } = {
  ...landingTypesList.reduce((obj: { [key: string]: any }, type: string) => {
    obj[type] = {
      component: LC.WelcomeScreen,
      withPolicyText: type,
    };
    return obj;
  }, {}),
  '/q': {
    component: LC.QuestionExample,
  },
  '/creating-profile': {
    component: LC.CreatingProfile,
    images: [
      './assets/images/reviewers/review_1.png',
      './assets/images/reviewers/review_2.png',
      './assets/images/reviewers/review_3.png',
      './assets/images/reviewers/review_4.png',
      './assets/images/reviewers/review_5.png',
      './assets/images/reviewers/review_6.png',
    ],
    withButton: false,
    wrapperProps: {
      customStyles: { default: 'justify-content: space-between;' },
    },
    componentProps: { screenId: 'creating_profile' },
  },
  '/signup': {
    component: LC.Signup,
    componentProps: { screenId: 'signup' },
  },
  '/checkout': {
    component: LC.PlansCheckout,
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
    withButton: false,
    componentProps: {
      popupStyle: true,
    },
    wrapperProps: {
      customStyles: { tablet: 'justify-content: flex-start;' },
    },
  },
  '/success': {
    component: LC.Success,
    images: [
      './assets/images/logo.png',
    ],
    withButton: false,
    componentProps: { screenId: 'success' },
  },
};

export interface RoutesProps extends CommonProps {
  readonly path: string;
  readonly element: React.JSX.Element;
}

export const pagesRoutes: RoutesProps[] = Object.keys(pagesConfig).map((path) => {
  const {
    component: Comp,
    componentProps,
    wrapperProps,
    withButton = true,
    withPolicyText,
    withoutWrap,
  } = pagesConfig[path];

  return {
    path,
    element: <Comp {...componentProps} />,
    withButton,
    withPolicyText,
    withoutWrap,
    wrapperProps,
  };
});
