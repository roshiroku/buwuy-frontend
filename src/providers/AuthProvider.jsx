import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/auth.service';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setUser(user);
    return user;
  };

  const register = async (data) => {
    const user = await authService.register(data);
    setUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const ctx = { user, isLoading, login, register, logout };

  useEffect(() => {
    // Check for token in localStorage
    const token = authService.getToken();
    if (token) {
      // Optionally, verify token with backend or decode it to get user info
      authService
        .auth()
        .then(setUser)
        .catch((error) => {
          console.error('Invalid token', error);
          logout();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={ctx}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
