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

// example
export const QuestionExample = lazyWithPreload(() => import('../../pages/QuestionExample'));

export const CreatingProfile = lazyWithPreload(() => import('../../pages/CreatingProfile'));
export const Signup = lazyWithPreload(() => import('../../pages/Signup'));
export const PlansCheckout = lazyWithPreload(() => import('../../pages/PlansCheckout'));
export const Success = lazyWithPreload(() => import('../../pages/Success'));