import { useTranslation } from 'react-i18next';

export const useEngString = () => {
  const { t } = useTranslation();
  return (key: string): string => `${t(key, { lng: 'en' }).replace(/\n/g, ' ')}`;
}