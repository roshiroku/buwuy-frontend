import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import MiniCart from './MiniCart';

const Header = () => {
  const { user, isLoading, logout } = useAuth();
  const { showCart, toggleCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div style={{ display: 'flex' }}>
        <div>logo</div>
        {isLoading ? (
          'loading...'
        ) : (
          user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <a href="/register">Register</a>
              <a href="/login">Login</a>
            </>
          )
        )}
        <button onClick={toggleCart}>cart</button>
        {showCart && <MiniCart />}
      </div>
    </header>
  );
};

export default Header;
