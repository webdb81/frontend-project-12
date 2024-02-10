import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import appRoutes from './routes.js';
import useAuth from './hooks/useAuth.jsx';
import initSockets from './api/socket.js';
import ContextProvider from './contexts/ContextProvider.jsx';

import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(`Auth LoggedIN: ${auth.loggedIn}`);

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to={appRoutes.loginPage()} state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => initSockets(dispatch), []);
  const { t } = useTranslation();

  useEffect(() => initSockets(dispatch, t));

  return (
    <ContextProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={appRoutes.loginPage()} element={<LoginPage />} />
            <Route path={appRoutes.signupPage()} element={<SignupPage />} />
            <Route path={appRoutes.notFoundPage()} element={<NotFoundPage />} />
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
    </ContextProvider>
  );
};

export default App;
