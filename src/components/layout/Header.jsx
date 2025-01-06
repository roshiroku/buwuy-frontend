import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Fade, AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import LinkButton from '../buttons/LinkButton';
import LogoText from './LogoText';
import Cart from '../cart/Cart';
import SearchForm from '../shop/SearchForm';
import UserMenu from './UserMenu';
import BackdropMenu from './BackdropMenu';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { cart, showCart, closeCart, toggleCart } = useCart();
  const headerRef = useRef(null);
  const cartButtonRef = useRef(null);

  const height = 72;

  const handleSearch = (params) => {
    for (const name in params) {
      if (params[name]?.length) {
        searchParams.set(name, params[name]);
      } else {
        searchParams.delete(name);
      }
    }

    navigate('/shop/search?' + searchParams);
  };

  useEffect(() => {
    closeCart();
    setIsSearching(false);
    setSearchInput(searchParams.get('q') || '');
  }, [location]);

  return (
    <Box sx={{ height }}>
      <AppBar
        ref={headerRef}
        position="fixed"
        sx={{
          height,
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
          backgroundColor: 'background.default',
          color: 'text.dark'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <LogoText />
            </Link>
            <Link to="/shop" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Shop</Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={() => setIsSearching(!isSearching)}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <DarkModeIcon />
            </IconButton>
            <IconButton ref={cartButtonRef} color="inherit" onClick={toggleCart} aria-label="Toggle Cart">
              <Badge badgeContent={cart?.products.length || 0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : (
              user ? (
                <UserMenu />
              ) : (
                <>
                  <LinkButton to="/login" variant="outlined" sx={{
                    borderRadius: 2,
                    borderColor: 'background.cardBorder',
                    backgroundColor: 'background.default',
                    color: 'text.dark'
                  }}>
                    Log In
                  </LinkButton>
                  <LinkButton to="/register" variant="contained" disableElevation sx={{
                    borderRadius: 2,
                    borderColor: 'black',
                    backgroundColor: 'text.dark',
                    color: 'background.default'
                  }}>
                    Sign Up
                  </LinkButton>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <BackdropMenu
        anchorEl={headerRef.current}
        open={isSearching}
        onClose={() => setIsSearching(false)}
        elevation={0}
        TransitionComponent={Fade}
        sx={{
          p: 0,
          maxWidth: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,.6)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.08)',
          borderRadius: 0,
          zIndex: 1000,
          paper: { backgroundColor: 'background.default' }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, letterSpacing: -0.5 }}>
            Find your perfect origami
          </Typography>
          <SearchForm value={searchInput} onInput={setSearchInput} onChange={handleSearch} />
        </Box>
      </BackdropMenu>
      <BackdropMenu
        anchorEl={cartButtonRef.current}
        open={showCart}
        onClose={toggleCart}
        sx={{
          p: 0,
          backgroundColor: 'rgba(0,0,0,.6)',
          backdropFilter: 'blur(4px)',
          top: height,
          paper: {
            mt: `-${height}px`,
            maxWidth: 480,
            maxHeight: 640,
            overflowY: 'auto'
          }
        }}
      >
        <Cart />
      </BackdropMenu>
    </Box >
  );
};

export default Header;
