import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import SocketContext from './contexts/SocketContext.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

export default init;
