import React, { useEffect } from 'react';
import {
  useLocation,
  useRoutes,
  Navigate,
} from 'react-router-dom';
import { pagesWithProgressBar } from './pagesWithProgressBar';
import { pagesRoutes , type routesProps } from './pagesConfig';
import { useCustomNavigate } from '../hooks';
import { MainLayout, ProgressBar, BottomText } from '../../components';

interface RouteWithAppContainerProps {
  element: React.JSX.Element;
  index: number;
  withButton?: boolean;
  withBottomText?: boolean;
  wrapperCustomStyles?: string;
}

const RouteWithAppContainer = ({
  element,
  index,
  withButton = true,
  withBottomText,
  wrapperCustomStyles,
}: RouteWithAppContainerProps) => {
  const buttonHeight = withButton ? 88 : 0;
  const textHeight = withBottomText ? 60 : 0;
  const withProgressBar: boolean = index !== -1;
  const pt = withProgressBar ? 52 : 16;
  const pb = !withButton && !withBottomText ? 16 : buttonHeight + textHeight;

  return (
    <MainLayout
      pt={pt}
      pb={pb}
      customStyles={wrapperCustomStyles}
    >
      {withProgressBar && (
        <ProgressBar
          totalCount={pagesWithProgressBar.length}
          currentRoute={index}
        />
      )}
      {element}
      {withBottomText && <BottomText/>}
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
  const location = useLocation();
  const navigate = useCustomNavigate();

  useEffect(() => window.scrollTo(0, 0));

  useEffect(() => {
    const handleBackButton = (event: any) => {
      event.preventDefault();
      navigate(location.pathname);
    };

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
          withBottomText={route.withBottomText}
          index={pagesWithProgressBar.indexOf(route.path)}
          wrapperCustomStyles={route.wrapperCustomStyles}
        />
      ),
    };
  });

  return useRoutes(wrappedRoutes);
};
