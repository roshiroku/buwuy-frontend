import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStorageCart, setStorageCart, useCart as useModel } from '../services/cart.service';
import productService from '../services/product.service';
import { useAuth } from './AuthProvider';
import { pick } from '../utils/object.utils';

export const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [localCart, setLocalCart] = useState({ products: [] });
  const { user } = useAuth();
  const { cart, setCart, saveCart, ...model } = useModel(user ? undefined : localCart);

  const updateCart = async (product, amount) => {
    const { _id } = product;
    const index = cart.products.findIndex((item) => item.product._id === _id);
    const item = cart.products[index] || {
      product: pick(product, '_id', 'name', 'images', 'price', 'stock'),
      amount: 0
    };

    if (item.amount + amount <= product.stock) {
      item.amount += amount;
    }

    if (index === -1 && item.amount > 0) {
      cart.products.push(item);
    } else if (index > -1 && item.amount < 1) {
      cart.products.splice(index, 1);
    }

    if (!cart.products.length) {
      setShowCart(false);
    }

    setCart({ ...cart });

    if (user) {
      await saveCart();
    } else {
      setStorageCart({
        products: cart.products.map((item) => ({
          product: item.product._id,
          amount: item.amount
        }))
      });
    }
  };

  useEffect(() => {
    const cart = getStorageCart();
    if (cart.products?.length) {
      productService.find({
        _id: cart.products.map((item) => item.product),
        limit: cart.products.length
      }).then(({ results }) => {
        const products = [];
        for (const { product: _id, amount } of cart.products) {
          const product = results.find((product) => product._id === _id);
          if (product) {
            products.push({ product, amount });
          }
        }
        setLocalCart({ products });
      });
    }
  }, []);

  const ctx = {
    cart,
    setCart,
    saveCart,
    updateCart,
    showCart,
    setShowCart,
    openCart: () => setShowCart(true),
    closeCart: () => setShowCart(false),
    toggleCart: () => setShowCart(!showCart),
    ...model
  };

  return (
    <CartContext.Provider value={ctx}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
