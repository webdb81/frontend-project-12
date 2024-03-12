import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './locales';
import store from './slices/index.js';
import initSockets from './api/socket.js';
import SocketProvider from './contexts/SocketContext.jsx';
import { FilterProvider } from './contexts/FilterContext.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import App from './App.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const socket = initSockets(store.dispatch);

  const rollbarConfig = {
    accessToken: process.env.REACT_CHAT_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketProvider socket={socket}>
              <FilterProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </FilterProvider>
            </SocketProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
