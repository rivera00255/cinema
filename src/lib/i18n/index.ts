import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koLocale from './locales/ko_KR.json';
import enLocale from './locales/en_US.json';

const resources = {
  ko: {
    translation: koLocale,
  },
  en: {
    translation: enLocale,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
