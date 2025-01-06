import { toFormData } from 'axios';
import axios from '../api/axios.js';

const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

const SETTINGS_KEY = 'settings';

export const getStorageSettings = () => {
  const settings = sessionStorage.getItem(SETTINGS_KEY);
  return settings ? JSON.parse(settings) : {};
};

export const setStorageSettings = (newSettings) => {
  const currentSettings = getStorageSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
};

export const removeStorageSettings = () => {
  sessionStorage.removeItem(SETTINGS_KEY);
};

export const auth = async () => {
  const { data } = await axios.get('/api/auth');
  return data;
};

export const login = async (email, password) => {
  const { data } = await axios.post('/api/auth/login', { email, password });
  setToken(data.token);
  return data;
};

export const register = async (data) => {
  data = data instanceof FormData ? data : toFormData(data);
  const { data: user } = await axios.post('/api/auth/register', data);
  setToken(user.token);
  return user;
};

export const updateProfile = async (data) => {
  const { data: user } = await axios.put('/api/auth', toFormData(data));
  setToken(user.token);
  return user;
};

export const updateSettings = async (data) => {
  const { data: user } = await axios.patch('/api/auth', data);
  return user;
};

export const logout = removeToken;
