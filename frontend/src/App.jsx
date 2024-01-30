import React from 'react';
import {
  Route, Routes, BrowserRouter, Navigate,
} from 'react-router-dom';
import useAuth from './hooks/useAuth.jsx';
import routes from './utils/routes.js';
import AuthProvider from './contexts/AuthContext.jsx';
import ChatProvider from './contexts/ChatContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
// import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Nav from './components/Nav.jsx';

const AuthCurrent = ({ children }) => {
  const auth = useAuth();

  return auth.currentUser ? children : <Navigate to={routes.login()} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path={routes.login()} element={<LoginPage />} />
            {/* <Route path={routes.signupPage()} element={<SignupPage />} /> */}
            <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
            <Route
              path="/"
              element={(
                <AuthCurrent>
                  <ChatPage />
                </AuthCurrent>
              )}
            />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  </div>
);

export default App;
