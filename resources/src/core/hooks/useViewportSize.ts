import { useEffect, useState } from 'react';

const getStickyButtonStyles = (bottomPadding: number, buttonHeight: number) => {
  const { height, offsetTop } = window?.visualViewport || {};
  if (height) {
    if (window.innerHeight !== height) {
      return {
        style: {
          top: `${height + (offsetTop || 0) - bottomPadding - buttonHeight}px`,
          bottom: 'auto',
          // boxShadow: '0 7px 0px 30px',
          zIndex: 1,
        },
      };
    }
  }
  return { style: { bottom: `${bottomPadding}px` } };
};

export const useViewportSize = (
  bottomPadding = 16,
  buttonHeight = 56
) => {
  const [stickyButtonStyles, setStickyButtonStyles] = useState(() =>
    getStickyButtonStyles(bottomPadding, buttonHeight)
  );

  useEffect(() => {
    const setStickyStyles = () => setStickyButtonStyles(getStickyButtonStyles(bottomPadding, buttonHeight));
    window?.visualViewport?.addEventListener('resize', setStickyStyles);
    window?.visualViewport?.addEventListener('scroll', setStickyStyles);
    return () => {
      window?.visualViewport?.removeEventListener('resize', setStickyStyles);
      window?.visualViewport?.removeEventListener('scroll', setStickyStyles);
    };
  }, [bottomPadding, buttonHeight]);

  return stickyButtonStyles;
};
