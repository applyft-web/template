import { useEffect } from 'react';
import { pagesConfig } from '../router';
import { usePreloadImages } from './usePreloadImages';

export const usePreloadNextPage = (nextPage: string) => {
  useEffect(() => {
    pagesConfig[nextPage].component.preload();
  }, [nextPage]);

  usePreloadImages(pagesConfig[nextPage].images);
};
