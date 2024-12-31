import { Link } from 'react-router-dom';
import { useCart } from '../../providers/CartProvider';
import CartItemList from '../../components/cart/CartItemList';

const CheckoutPage = () => {
  const { cart } = useCart();
  return cart && (
    <div>
      <CartItemList items={cart.products} />
      <div>
        <Link to="/checkout/shipment">
          Proceed
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
