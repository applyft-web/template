import { type DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    text: '#fff',
    bodyBackground: '#292C44',
    primary: '#FDC21C',
    buttonHover: '#FDC21C',
    buttonDisabled: '#ffe29f',

    optionInactive: '#404464',
    optionActive: '#FDC21C',
    optionCheckActive: '#292C44',
    optionCheckInactive: '#898FBD',

    progressBar: '#F0EFEF',
    progressBarActive: '#FDC21C',
    progressBarBg: '#F0EFEF',
  },
  mobileWidth: '350',
  tabletMinWidth: '744',
  desktopMinWidth: '1280',
  maxContentWidth: '343',
};