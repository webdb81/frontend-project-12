import React, { useEffect } from 'react';

import { Provider, ErrorBoundary } from '@rollbar/react';

import { useDispatch } from 'react-redux';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import appRoutes from './routes.js';
import useAuth from './hooks/useAuth.jsx';
import initSockets from './api/socket.js';
import AuthProvider from './contexts/AuthProvider.jsx';

import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_CHAT_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to={appRoutes.loginPage()} state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => initSockets(dispatch, t));

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <ToastContainer />
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path={appRoutes.loginPage()} element={<LoginPage />} />
                <Route path={appRoutes.signupPage()} element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route
                  path={appRoutes.chatPage()}
                  element={(
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  )}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
