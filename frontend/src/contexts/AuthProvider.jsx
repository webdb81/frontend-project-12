import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? { loggedIn: true, ...user } : { loggedIn: false, token: null, username: null };
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAuthState({ loggedIn: true, ...user });
    }
  }, []);

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('user', JSON.stringify(authState));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState]);

  const logIn = useCallback((logInToken, logInUsername) => {
    setAuthState({ loggedIn: true, token: logInToken, username: logInUsername });
  }, []);

  const logOut = useCallback(() => {
    setAuthState({ loggedIn: false, token: null, username: null });
  }, []);

  const value = useMemo(() => ({
    ...authState,
    logIn,
    logOut,
  }), [authState, logIn, logOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
