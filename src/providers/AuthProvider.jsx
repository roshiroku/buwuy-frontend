import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/auth.service';
import { removeStorageCart } from '../services/cart.service';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [settings, setSettings] = useState(authService.getStorageSettings());
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const onLogin = (user) => {
    setUser(user);
    setSettings(user.settings);
    authService.setStorageSettings(user.settings);
    removeStorageCart();
    return user;
  };

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    return onLogin(user);
  };

  const register = async (data) => {
    const user = await authService.register(data);
    return onLogin(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const user = await authService.updateProfile(data);
    setUser(user);
    return user;
  };

  const updateSettings = async (data) => {
    setSettings(data);
    authService.setStorageSettings(data);

    if (user) {
      const user = await authService.updateSettings(data);
      setUser(user);
    }
  };

  useEffect(() => {
    // Check for token in localStorage
    const token = authService.getToken();
    if (token) {
      // Optionally, verify token with backend or decode it to get user info
      authService
        .auth()
        .then(onLogin)
        .catch((error) => {
          console.error('Invalid token', error);
          logout();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const ctx = {
    user,
    isLoading,
    settings,
    setSettings: updateSettings,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={ctx}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
