import React, { useEffect } from 'react';
import {
  useLocation,
  useRoutes,
  Navigate,
} from 'react-router-dom';
import { pagesWithProgressBar } from './pagesWithProgressBar';
import { pagesRoutes , type routesProps } from './pagesConfig';
import { useCustomNavigate } from '../hooks';
import { PolicyText } from '../../components';
import { ProgressBar, MainLayout } from '@applyft-web/ui-components';

interface RouteWithAppContainerProps {
  element: React.JSX.Element;
  progressBarIndex: number;
  withButton?: boolean;
  withPolicyText?: boolean;
  wrapperCustomStyles?: string;
}

const RouteWithAppContainer = ({
  element,
  progressBarIndex,
  withButton = true,
  withPolicyText,
  wrapperCustomStyles,
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
      customStyles={wrapperCustomStyles}
    >
      {withProgressBar && (
        <ProgressBar
          totalCount={pagesWithProgressBar.length}
          currentRoute={progressBarIndex}
        />
      )}
      {element}
      {withPolicyText && <PolicyText/>}
    </MainLayout>
  );
};

const routes: routesProps[] = [
  ...pagesRoutes,
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export const Router = () => {
  const { pathname, search } = useLocation();
  const navigate = useCustomNavigate();

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

    return {
      ...route,
      element: (
        <RouteWithAppContainer
          element={route.element}
          withButton={route.withButton}
          withPolicyText={route.withPolicyText}
          progressBarIndex={pagesWithProgressBar.indexOf(route.path)}
          wrapperCustomStyles={route.wrapperCustomStyles}
        />
      ),
    };
  });

  return useRoutes(wrappedRoutes);
};
