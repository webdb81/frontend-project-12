import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const initI18n = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });
};

export default initI18n;
