import { useEffect } from 'react';
import { pagesConfig } from '../router';
import { usePreloadImages } from './usePreloadImages';
import { useNextPageName } from './useNextPageName';

export const usePreloadNextPage = () => {
  const nextPage = useNextPageName();

  useEffect(() => {
    if (!pagesConfig[nextPage]) return;
    pagesConfig[nextPage].component.preload();
  }, [nextPage]);

  usePreloadImages(pagesConfig[nextPage]?.images);
};
