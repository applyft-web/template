import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
// import fr from './fr.json';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: navigator.language,
  // debug: true,
  resources: {
    en: { translation: en },
    // fr: { translation: fr },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});