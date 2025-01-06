import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import cartService, { getStorageCart, setStorageCart, useCart as useModel } from '../services/cart.service';
import productService from '../services/product.service';
import { useAuth } from './AuthProvider';
import { pick } from '../utils/object.utils';

export const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [localCart, setLocalCart] = useState(null);
  const { user, isLoading: isLoadingUser } = useAuth();

  const { cart, setCart, saveCart, isLoadingCart } = useModel(isLoadingUser || !localCart ? null : user ? undefined : localCart);

  const subtotal = useMemo(() => cart?.items.reduce((total, item) => {
    return total + item.product.price * item.amount;
  }, 0) || 0, [cart]);

  const updateCart = useCallback(async (product, amount) => {
    const { _id } = product;
    const index = cart.items.findIndex((item) => item.product._id === _id);
    const item = cart.items[index] || {
      product: pick(product, '_id', 'name', 'images', 'price', 'stock'),
      amount: 0
    };

    if (item.amount + amount <= product.stock) {
      item.amount += amount;
    }

    if (index === -1 && item.amount > 0) {
      cart.items.push(item);
    } else if (index > -1 && item.amount < 1) {
      cart.items.splice(index, 1);
    }

    if (!cart.items.length) {
      setShowCart(false);
    }

    setCart({ ...cart });

    if (user) {
      await saveCart();
    } else {
      setStorageCart(cart);
    }
  }, [cart, saveCart, user]);

  const clearCart = useCallback(async () => {
    setCart({ items: [] });

    if (user) {
      await cartService.delete();
    } else {
      setStorageCart({ items: [] });
    }
  }, [user]);

  const openCart = useCallback(() => setShowCart(true), []);
  const closeCart = useCallback(() => setShowCart(false), []);
  const toggleCart = useCallback(() => setShowCart((prev) => !prev), []);

  useEffect(() => {
    const cart = getStorageCart();
    if (cart.items?.length) {
      productService.find({
        _id: cart.items.map((item) => item.product),
        limit: cart.items.length
      }).then(({ results }) => {
        const items = [];
        for (const { product: _id, amount } of cart.items) {
          const product = results.find((product) => product._id === _id);
          if (product) {
            items.push({ product, amount });
          }
        }

        setLocalCart({ items });
      });
    } else {
      setLocalCart({ items: [] });
    }
  }, []);

  const ctx = useMemo(() => ({
    cart,
    setCart,
    saveCart,
    updateCart,
    clearCart,
    subtotal,
    showCart,
    setShowCart,
    isLoadingCart: isLoadingCart || isLoadingUser,
    openCart,
    closeCart,
    toggleCart
  }), [updateCart, subtotal, showCart, isLoadingCart, isLoadingUser]);

  return (
    <CartContext.Provider value={ctx}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
