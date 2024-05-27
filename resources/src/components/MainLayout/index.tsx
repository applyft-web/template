import React from 'react';
import * as S from './styled';

interface MainLayoutProps {
  children?: any;
  pt?: string | number;
  pb?: string | number;
  customStyles?: string;
}

export const MainLayout = ({
  children,
  pt,
  pb,
  customStyles,
}: MainLayoutProps) => (
  <S.StyledLayout
    $pt={pt}
    $pb={pb}
    $customStyles={customStyles}
  >
    {children}
  </S.StyledLayout>
);
