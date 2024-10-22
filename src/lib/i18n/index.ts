import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './en.json';
import frTranslation from './fr.json';

import frErrorTransaltion from './errors_fr.json';
import enErrorTransaltion from './errors_en.json';

// import ar from "./ar.json";

const i18nConfig = {
  fallbackLng: 'en',
  resources: {
    en: {
      translation: { ...enTranslation, ...enErrorTransaltion },
    },
    fr: {
      translation: { ...frTranslation, ...frErrorTransaltion },
    },
  },
};

i18next.use(initReactI18next).use(LanguageDetector).init(i18nConfig);

export default i18next;
