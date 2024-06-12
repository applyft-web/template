import React, { createContext, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './locales/config';
import { selectLoader } from './core/store/loader';
import { useInitAnalytics, useSetTokens, useInlineScript } from './core/hooks';
import { AF_SMART_SCRIPT_KEY, PRODUCT_NAME } from './core/constants';
import { oneLinkSmartScript } from './core/scripts';
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
  useInlineScript(oneLinkSmartScript, AF_SMART_SCRIPT_KEY);

  return (
    <Suspense fallback={<FallBack />}>
      <GlobalThemeProvider projectTheme={PRODUCT_NAME} /* projectTheme={'gz'} */>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Alert isArabic={isArabic} />
        <Loader show={show} message={message} />
      </GlobalThemeProvider>
    </Suspense>
  );
};

export default App;
