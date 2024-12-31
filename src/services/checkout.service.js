import axios from '../api/axios.js';

const baseUrl = '/api/checkout';

export const startCheckout = async (input) => {
  const { data } = await axios.post(baseUrl, input);
  return data;
};

export const finishCheckout = async (id, input) => {
  const { data } = await axios.post(baseUrl + `/${id}`, input);
  return data;
};

export const getCheckout = async (id) => {
  const { data } = await axios.get(baseUrl + `/${id}`);
  return data;
};
