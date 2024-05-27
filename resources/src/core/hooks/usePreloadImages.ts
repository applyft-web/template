import { useEffect } from 'react';

export const usePreloadImages = (imageUrls: string[] | undefined) => {
  useEffect(() => {
    if (!imageUrls || !imageUrls.length) return;
    imageUrls.forEach((url: string) => {
      new Image().src = url;
    });
  }, [imageUrls]);
};
