import axios from '../api/axios.js';

const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const auth = async () => {
  const { data } = await axios.get('/api/auth/me');
  return data;
};

export const login = async (email, password) => {
  const { data } = await axios.post('/api/auth/login', { email, password });
  setToken(data.token);
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await axios.post('/api/auth/register', { name, email, password });
  setToken(data.token);
  return data;
};

export const logout = removeToken;
