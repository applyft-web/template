import React, { lazy } from 'react';

export type LazyComponentWithPreload<T extends React.ComponentType<any>> = {
  preload: () => Promise<{ default: T }>;
} & React.LazyExoticComponent<T>;

const lazyWithPreload = (factory: () => Promise<{ default: React.ComponentType<any> }>): LazyComponentWithPreload<React.ComponentType<any>> => {
  const Component = lazy(factory) as LazyComponentWithPreload<React.ComponentType<any>>;
  Component.preload = factory;
  return Component;
};

export const WelcomeScreen = lazyWithPreload(() => import('../../pages/Welcome'));
export const Q2 = lazyWithPreload(() => import('../../pages/quiz/Q2'));
export const Q3 = lazyWithPreload(() => import('../../pages/quiz/Q3'));
export const Q4 = lazyWithPreload(() => import('../../pages/quiz/Q4'));
export const Q5 = lazyWithPreload(() => import('../../pages/quiz/Q5'));
export const Q6 = lazyWithPreload(() => import('../../pages/quiz/Q6'));
export const Q7 = lazyWithPreload(() => import('../../pages/quiz/Q7'));
export const Q8 = lazyWithPreload(() => import('../../pages/quiz/Q8'));
export const Q9 = lazyWithPreload(() => import('../../pages/quiz/Q9'));
export const Q10 = lazyWithPreload(() => import('../../pages/quiz/Q10'));
export const Q11 = lazyWithPreload(() => import('../../pages/quiz/Q11'));
export const Q12 = lazyWithPreload(() => import('../../pages/quiz/Q12'));
export const Q13 = lazyWithPreload(() => import('../../pages/quiz/Q13'));
export const Q14 = lazyWithPreload(() => import('../../pages/quiz/Q14'));
export const Q15 = lazyWithPreload(() => import('../../pages/quiz/Q15'));
export const Q16 = lazyWithPreload(() => import('../../pages/quiz/Q16'));
export const Q17 = lazyWithPreload(() => import('../../pages/quiz/Q17'));
export const Q18 = lazyWithPreload(() => import('../../pages/quiz/Q18'));
export const F1 = lazyWithPreload(() => import('../../pages/facts/F1'));
export const F2 = lazyWithPreload(() => import('../../pages/facts/F2'));
export const F3 = lazyWithPreload(() => import('../../pages/facts/F3'));
export const F4 = lazyWithPreload(() => import('../../pages/facts/F4'));
export const F5 = lazyWithPreload(() => import('../../pages/facts/F5'));
export const F6 = lazyWithPreload(() => import('../../pages/facts/F6'));
export const F7 = lazyWithPreload(() => import('../../pages/facts/F7'));
export const QuizResults = lazyWithPreload(() => import('../../pages/QuizResults'));
export const CreatingProfile = lazyWithPreload(() => import('../../pages/CreatingProfile'));
export const Name = lazyWithPreload(() => import('../../pages/Name'));
export const Age = lazyWithPreload(() => import('../../pages/Age'));
export const Signup = lazyWithPreload(() => import('../../pages/Signup'));
export const PlansCheckout = lazyWithPreload(() => import('../../pages/PlansCheckout'));
export const Success = lazyWithPreload(() => import('../../pages/Success'));