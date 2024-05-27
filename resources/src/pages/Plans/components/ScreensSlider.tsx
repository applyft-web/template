import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as S from './styled';

export const ScreensSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const slides = new Array(3).fill(null);
  const renderSlide = (slide: any, index: number) => (
    <S.SliderItem
      $img={`screen-${index+1}`}
      $active={index === activeSlide}
      $activeSlide={activeSlide+1}
      key={index}
      onClick={() => setActiveSlide(index)}
    />
  );
  const renderDot = (slide: any, index: number) => (
    <S.SliderDot
      $active={index === activeSlide}
      onClick={() => setActiveSlide(index)}
      key={index}
    />
  );
  const moveSlide = useCallback((direction: 'left' | 'right') => () => {
    if (direction === 'left') {
      setActiveSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
    } else {
      setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
    }
  }, [activeSlide, slides.length]);
  const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg className={'arrow'} onClick={moveSlide(direction)} width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.19721 2.18735C9.63276 1.77662 9.63276 1.08399 9.19721 0.673251C8.79633 0.295209 8.17025 0.295209 7.76937 0.673251L0.771477 7.27247C0.352916 7.66719 0.352917 8.33281 0.771477 8.72753L7.76937 15.3267C8.17025 15.7048 8.79633 15.7048 9.19721 15.3267C9.63276 14.916 9.63276 14.2234 9.19721 13.8126L3.03342 8L9.19721 2.18735Z" fill="#C9CCE2"/>
    </svg>
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let startX = 0;
    let endX = 0;
    let isSwiping = false;
    const handleTouchStart = (e: TouchEvent) => {
      isSwiping = true;
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) return;
      endX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (!isSwiping) return;
      isSwiping = false;
      if (startX - endX > 50) {
        moveSlide('right')();
      } else if (endX - startX > 50) {
        moveSlide('left')();
      }
    };
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);
    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSlide, moveSlide]);


  return (
    <S.SliderWrapper>
      <S.Slider ref={sliderRef}>
        {slides.map(renderSlide)}
      </S.Slider>
      <S.SliderControls>
        <Arrow direction={'left'} />
        <Arrow direction={'right'} />
      </S.SliderControls>
      <S.SliderDots>
        {slides.map(renderDot)}
      </S.SliderDots>
    </S.SliderWrapper>
  );
};
