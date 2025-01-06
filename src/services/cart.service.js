import { toFormData } from 'axios';
import axios from '../api/axios.js';
import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

const CART_KEY = 'cart';

export function getStorageCart() {
  const cart = { items: [] };
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || cart;
  } catch (e) {
    return cart;
  }
}

export function setStorageCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cartService.normalize(cart)));
};

export const removeStorageCart = () => sessionStorage.removeItem(CART_KEY);

class CartService extends ModelService {
  constructor() {
    super('/api/cart');
  }

  async find() {
    throw new Error('Unimplemented Method');
  }

  async get() {
    const { data } = await axios.get(this.baseUrl);
    return data;
  }

  async save(model) {
    const method = model._id ? 'put' : 'post';
    const { data } = await axios[method](this.baseUrl, toFormData(this.normalize(model)));
    return data;
  }

  async delete() {
    const { data } = await axios.delete(this.baseUrl);
    return data;
  }

  normalize({ items, ...data }) {
    return {
      ...data,
      items: items.map(({ product, amount }) => ({
        product: typeof product === 'object' ? product._id : product,
        amount
      }))
    };
  }
}

const cartService = new CartService();

export const { useCartSingleton: useCart } = useModelService(cartService, { name: 'cart' });

export default cartService;
