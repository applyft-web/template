import { useTranslation } from 'react-i18next';
import { ReviewsSlider, type ReviewProps } from '@applyft-web/ui-components';

interface ReviewsBlockProps {
  shortList?: boolean;
  [propName: string]: any;
}

export const ReviewsBlock = ({ shortList, ...props}: ReviewsBlockProps) => {
  const { t } = useTranslation();
  const reviewsList: ReviewProps[] = [
    {
      name: 'John Saymont',
      text: t('review_1'),
      img: './assets/images/reviewers/review_1.png',
    },
    {
      name: 'Erica Hilertoff',
      text: t('review_2'),
      img: './assets/images/reviewers/review_2.png',
    },
    {
      name: 'Yan Frunder',
      text: t('review_3'),
      img: './assets/images/reviewers/review_3.png',
    },
    {
      name: 'Kiara Martínez',
      text: t('review_4'),
      img: './assets/images/reviewers/review_4.png',
    },
    {
      name: 'Wesley Everson',
      text: t('review_5'),
      img: './assets/images/reviewers/review_5.png',
    },
    {
      name: 'Shanon Burges',
      text: t('review_6'),
      img: './assets/images/reviewers/review_6.png',
    },
  ];
  return (
    <ReviewsSlider
      reviewsList={shortList ? reviewsList.slice(0,3) : reviewsList}
      {...props}
    />
  );
};
