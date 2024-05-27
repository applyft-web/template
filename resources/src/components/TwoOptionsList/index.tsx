import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDelayedExecute } from '../../core/hooks';
import { OptionsItem } from '@applyft-web/ui-components';
import * as S from './styled';

interface ListProps {
  options: string[];
  icons?: { [key: string]: React.ReactNode };
  onClickFunction: (key: string) => void;
}

export const TwoOptionsList = ({
  options,
  icons,
  onClickFunction,
}: ListProps) => {
  const { t } = useTranslation();
  const delayedExecute = useDelayedExecute();
  const [active, setActive] = React.useState<string | null>(null);
  const onItemClick = (key: string) => {
    setActive(key);
    delayedExecute(() => onClickFunction(key));
  };

  const renderOption = (key: string, i: number) => {
    const isActive = active === key;
    const itemCustomStyles = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
    
      @media (hover:hover) {
        &:hover {
          background-color: #FDC21C;
          color: #292C44;
          
          .icon-path {
            fill: #292C44;
          }
        }
      }
      
      ${isActive ? `
        color: #292C44;
  
        .icon-path {
          fill: #292C44;
        }
      ` : ''};
          
      .icon {
        margin-bottom: 20px;
      }
  
      .icon-path {
        transition: fill 0.3s;
      }
    `;

    return (
      <OptionsItem
        onClick={() => onItemClick(key)}
        customId={`option-${i+1}`}
        isActive={isActive}
        customStyles={itemCustomStyles}
        key={key}
      >
        {icons && icons[key]}
        <span>{t(key)}</span>
      </OptionsItem>
    );
  };

  return (
    <S.Options>
      {options.map(renderOption)}
    </S.Options>
  );
};
