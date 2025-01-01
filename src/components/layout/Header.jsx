import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinkButton from '../buttons/LinkButton';
import LogoText from './LogoText';
import Cart from '../cart/Cart';

const Header = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { cart, showCart, closeCart, toggleCart } = useCart();
  const cartButtonRef = useRef(null);

  useEffect(() => {
    closeCart();
  }, [location]);

  return (
    <Box sx={{ height: 72 }}>
      <AppBar position="fixed" sx={{
        height: 'inherit',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
        backgroundColor: 'background.default',
        color: 'text.dark'
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <LogoText />
            </Link>
            <Link to="/shop" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Shop</Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
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
      <Menu
        anchorEl={cartButtonRef.current}
        open={showCart}
        onClose={toggleCart}
        slotProps={{
          paper: {
            sx: {
              maxWidth: 480,
              maxHeight: 640,
              overflowY: 'auto',
              '& > .MuiMenu-list': { p: 0 }
            }
          }
        }}
      >
        <Cart />
      </Menu>
    </Box>
  );
};

const UserMenu = () => {
  const userButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton ref={userButtonRef} onClick={() => setIsOpen(!isOpen)} color="inherit">
        <Avatar src={user.avatar} alt={user.name} />
      </IconButton>
      <Menu
        anchorEl={userButtonRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem component={Link} to="/profile" onClick={() => setIsOpen(false)}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders" onClick={() => setIsOpen(false)}>Orders</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
