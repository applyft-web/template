import React, { createContext, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './locales/config';
import { selectLoader } from './core/store/loader';
import { useInitAnalytics, useSetTokens } from './core/hooks';
import { PRODUCT_NAME } from './core/constants';
import { Router } from './core/router';
import { GlobalThemeProvider, FallBack, Loader } from '@applyft-web/ui-components';
import { Alert } from './components';

const locale = navigator.language.split('-')[0];
const isArabic = locale.startsWith('ar');
export const LocaleContext = createContext(locale);
export const ArabicContext = createContext(isArabic);

const App = () => {
  const { show, message } = useSelector(selectLoader);

  useInitAnalytics();
  useSetTokens();

  return (
    <GlobalThemeProvider projectTheme={PRODUCT_NAME}>
      <Suspense fallback={<FallBack />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Alert isArabic={isArabic} />
        <Loader show={show} message={message} />
      </Suspense>
    </GlobalThemeProvider>
  );
};

export default App;
