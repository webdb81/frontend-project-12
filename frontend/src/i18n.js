import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const initI18n = async () => {
  await i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });
};

export default initI18n;
