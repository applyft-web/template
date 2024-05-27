import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoader } from '../../core/store/loader';
import { theme } from '../../core/theme';
import * as S from './styled';

export const Loader = ({ forceShow = false }: { forceShow?: boolean }) => {
  const { show, message } = useSelector(selectLoader);
  const fill = theme?.colors?.primary || '#000';

  if (show || forceShow) {
    return (
      <S.StyledSpinner id={'loading-element'} $transparent={forceShow}>
        <S.StyledSVG width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" $fill={fill}>
          <circle cx="24.5" cy="4" r="4" transform="rotate(90 24.5 4)" />
          <circle cx="24.5" cy="44" r="4" transform="rotate(90 24.5 44)" fillOpacity="0.3" />
          <circle opacity="0.15" cx="44.5" cy="24" r="4" transform="rotate(90 44.5 24)" />
          <circle cx="4.5" cy="24" r="4" transform="rotate(90 4.5 24)" fillOpacity="0.65" />
          <circle opacity="0.2" cx="38.642" cy="38.1421" r="4" transform="rotate(135 38.642 38.1421)" />
          <circle cx="10.3578" cy="9.85779" r="4" transform="rotate(135 10.3578 9.85779)" fillOpacity="0.85" />
          <circle cx="10.3579" cy="38.1421" r="4" transform="rotate(-135 10.3579 38.1421)" fillOpacity="0.5" />
          <circle opacity="0.05" cx="38.6421" cy="9.85779" r="4" transform="rotate(-135 38.6421 9.85779)" />
        </S.StyledSVG>
        <S.Message>{message}</S.Message>
      </S.StyledSpinner>
    );
  }
  return null;
};
