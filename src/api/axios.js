import axios from 'axios';
import { getToken } from '../services/auth.service';

const instance = axios.create({
  baseURL: import.meta.env.VITE_ROOT_URI,
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});

// Request interceptor to add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific status codes here
    return Promise.reject(error);
  }
);

export default instance;
