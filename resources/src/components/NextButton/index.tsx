import React from 'react';
import { ContinueButton } from '@applyft-web/ui-components';

export const NextButton = (props: any) => (
  <ContinueButton {...props} customStyles={'bottom:16px;color:#292C44;text-transform:uppercase;font-weight:700;'.concat(props.customStyles)} />
);
