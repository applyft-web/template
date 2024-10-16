import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  useLocation,
  useRoutes,
  Navigate,
} from 'react-router-dom';
import { selectPaywallType } from '../store/plans';
import { ProgressBarLists } from './pagesWithProgressBar';
import { pagesRoutes , type RoutesProps, type CommonProps } from './pagesConfig';
import { useCustomNavigate } from '../hooks';
import { PolicyText } from '../../components';
import { ProgressBar, MainLayout } from '@applyft-web/ui-components';

interface RouteWithAppContainerProps extends CommonProps{
  element: React.JSX.Element;
  progressBarProps: {
    index: number;
    length: number;
  };
}

const RouteWithAppContainer = ({
  element,
  progressBarProps: {
    index: progressBarIndex,
    length: progressBarLength,
  },
  withButton = true,
  withPolicyText,
  wrapperProps = {},
}: RouteWithAppContainerProps) => {
  const buttonHeight = withButton ? 88 : 0;
  const textHeight = withPolicyText ? 60 : 0;
  const withProgressBar: boolean = progressBarIndex !== -1;
  const pt = withProgressBar ? 52 : 16;
  const pb = !withButton && !withPolicyText ? 16 : buttonHeight + textHeight;

  return (
    <MainLayout
      pt={pt}
      pb={pb}
      {...wrapperProps}
    >
      {withProgressBar && (
        <ProgressBar
          totalCount={progressBarLength}
          currentRoute={progressBarIndex}
        />
      )}
      {element}
      {withPolicyText && <PolicyText/>}
    </MainLayout>
  );
};

const routes: RoutesProps[] = [
  ...pagesRoutes,
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export const Router = () => {
  const { pathname, search } = useLocation();
  const navigate = useCustomNavigate();
  const paywallType = useSelector(selectPaywallType);
  const pagesWithProgressBar = useMemo(
    () => ProgressBarLists[paywallType],
    [paywallType]
  );

  useEffect(() => window.scrollTo(0, 0));

  useEffect(() => {
    const handleBackButton = (event: any) => {
      event.preventDefault();
      navigate(pathname);
    };

    window.history.pushState(null, '', `${pathname}${search}`);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  });

  const wrappedRoutes = routes.map((route) => {
    if (route.withoutWrap) {
      return route;
    }

    const { path, element, withButton, withPolicyText, wrapperProps } = route;
    return {
      ...route,
      element: (
        <RouteWithAppContainer{...{
          element,
          withButton,
          withPolicyText,
          progressBarProps: {
            index: pagesWithProgressBar?.indexOf(path),
            length: pagesWithProgressBar?.length,
          },
          wrapperProps,
        }}/>
      ),
    };
  });

  return useRoutes(wrappedRoutes);
};
