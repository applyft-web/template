import React, { useEffect, useRef, useState } from 'react';
import * as S from './styled';

// TODO draggable slider

const DEFAULT_AUTO_SCROLL_INTERVAL = 2000;

export interface ReviewProps {
  name: string;
  text: string;
  img?: string;
}

interface ReviewsSliderProps {
  reviewsList: ReviewProps[];
  mt?: number | string;
  mb?: number | string;
  sliderInterval?: number;
  staticMode?: boolean;
}

export const ReviewsSlider = ({
  reviewsList,
  mt,
  mb,
  sliderInterval = DEFAULT_AUTO_SCROLL_INTERVAL,
  staticMode = false,
}: ReviewsSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [stopAutoScroll, setStopAutoScroll] = useState(false);
  const renderReviews = (r: ReviewProps, index: number) => {
    const { name, text, img } = r;
    return (
      <S.ReviewsItem $staticMode={staticMode} key={index}>
        <S.Reviewer $image={img}>{name || '\u00A0'}</S.Reviewer>
        <S.ReviewText>{text}</S.ReviewText>
      </S.ReviewsItem>
    );
  };
  const touchMoveHandler = (e: React.TouchEvent) => {
    if (staticMode) return;
    /*e.preventDefault();
    if (stopAutoScroll) {
      const slider = sliderRef.current;
      if (!slider) return;
      const { clientX } = e.changedTouches[0];
      const { width } = slider.getBoundingClientRect();
      const { left } = slider.getBoundingClientRect();
      const x = clientX - left;
      const percent = x / width * 100;
      slider.style.transform = `translateX(calc(-${percent}% - ${percent * APP_SIDE_PADDING}px))`;
    }*/
  };
  const touchStartHandler = (e: React.TouchEvent) => {
    if (staticMode) return;
    setStopAutoScroll(true);
  };
  const touchEndHandler = (e: React.TouchEvent) => {
    if (staticMode) return;
    setStopAutoScroll(false);
  };

  useEffect(() => {
    if (staticMode) return;
    const slider = sliderRef.current;
    if (slider) {
      slider.appendChild(slider.children[0].cloneNode(true));
    }
  }, [staticMode]);

  useEffect(() => {
    if (staticMode) return;
    const slider = sliderRef.current;
    if (!slider) return;

    let counter = 0;

    const nextSlide = () => {
      if (stopAutoScroll) return;
      counter++;
      updateSlidePosition();
    };

    const sliderItem = slider.children[0] as HTMLElement;
    const sliderItemWidth = sliderItem.offsetWidth;
    const sliderItemMargin = S.SLIDER_ITEM_MARGIN;

    const updateSlidePosition = () => {
      slider.style.cssText = `
        transform: translateX(calc(-${counter * sliderItemWidth}px - ${counter * sliderItemMargin}px))
      `;
      if (counter === reviewsList.length) {
        setTimeout(() => {
          counter = 0;
          slider.style.cssText = 'transition: none; transform: translateX(0)';
        }, sliderInterval/2);
      }
    };

    const interval = setInterval(nextSlide, sliderInterval);

    return () => clearInterval(interval);
  }, [staticMode, stopAutoScroll, reviewsList.length, sliderInterval]);

  return (
    <S.ReviewsContainer $mt={mt} $mb={mb} >
      <S.ReviewsBlock
        ref={sliderRef}
        id={'slider'}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        $staticMode={staticMode}
      >
        {reviewsList.map(renderReviews)}
      </S.ReviewsBlock>
    </S.ReviewsContainer>
  );
};
