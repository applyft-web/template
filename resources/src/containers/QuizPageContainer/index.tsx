import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDelayedExecute, useEngString } from '../../core/hooks';
import { ContinueButton, OptionsItem, OptionsList } from '@applyft-web/ui-components';
import * as S from './styled';

interface AnswerProps {
  content: any;
  onclick?: (key: any) => void;
  key: string;
}

interface QuizPageContainerProps {
  isMultiChoice?: boolean;
  title: string;
  subtitle?: string;
  answers: string[];
  answersList?: AnswerProps[];
  onContinueClick: (key: any) => void;
  centred?: boolean;
}

type ListType = string[];

export const QuizPageContainer = ({
  isMultiChoice = false,
  title,
  subtitle,
  answers,
  answersList,
  onContinueClick,
  centred,
}: QuizPageContainerProps) => {
  const { t } = useTranslation();
  const getEngString = useEngString();
  const delayedExecute = useDelayedExecute();
  const [activesList, setActivesList] = useState<ListType>([]);
  const renderAnswer = (item: AnswerProps, i: number) => {
    const key = item.key;
    const onItemClick = () => {
      const updateList = (list: ListType): ListType => {
        return list.includes(key)
          ? list.filter((i: string) => i !== key)
          : list.concat([key])
      };

      if (isMultiChoice) {
        setActivesList(updateList(activesList));
      } else {
        setActivesList([key]);
        delayedExecute(() => onContinueClick(item.key));
      }
    };
    const isActive = activesList.includes(key);

    return (
      <OptionsItem
        onClick={onItemClick}
        multiChoice={isMultiChoice}
        isActive={isActive}
        customId={`option-${i+1}`}
        key={i}
      >
        {item.content}
      </OptionsItem>
    );
  };
  const getAnswersList = (answers: string[]) => answers.map((answer) => ({
    content: t(answer),
    key: getEngString(answer),
  }));

  return (
    <>
      <S.Title>{title}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      <OptionsList customStyles={'margin-top:24px;'}>
        {(answersList || getAnswersList(answers)).map(renderAnswer)}
      </OptionsList>
      {isMultiChoice && (
        <ContinueButton
          onClick={() => onContinueClick(activesList)}
          disabled={activesList.length === 0}
        />
      )}
    </>
  );
};
