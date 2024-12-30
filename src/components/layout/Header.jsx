import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import LogoText from './LogoText';
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
    <header style={{ height: '92px' }}>
      <div style={{
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        width: '100%',
        height: 'inherit',
        background: '#242424',
        padding: '16px',
        boxSizing: 'border-box'
      }}>
        <Link to="/">
          <LogoText />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
          <div style={{ position: 'relative' }}>
            <button onClick={toggleCart}>cart</button>
            <div style={{ position: 'absolute', right: 0, background: '#242424', display: showCart ? 'block' : 'none' }}>
              <MiniCart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
