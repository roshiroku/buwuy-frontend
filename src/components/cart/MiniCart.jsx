import { Link } from 'react-router-dom';
import { useCart } from '../../providers/CartProvider';
import CartItemList from './CartItemList';

const MiniCart = () => {
  const { cart, clearCart } = useCart();

  return cart && (
    <div>
      <CartItemList items={cart.products} />
      <button disabled={!cart.products.length} onClick={clearCart}>
        Clear Cart
      </button>
      <Link to="/checkout">
        Checkout
      </Link>
    </div>
  );
};

export default MiniCart;
