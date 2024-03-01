import React, { useState, useEffect, useMemo } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('userId', JSON.stringify({ token, username }));
    } else {
      localStorage.removeItem('userId');
    }
  }, [token, username]);

  const logIn = (logInToken, logInUsername) => {
    setToken(logInToken);
    setUsername(logInUsername);
    setLoggedIn(true);
  };

  const logOut = () => {
    setToken(null);
    setUsername(null);
    setLoggedIn(false);
  };

  const value = useMemo(() => ({
    loggedIn, logIn, logOut, token, username,
  }), [loggedIn, token, username]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
