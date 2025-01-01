import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LinkButton from '../buttons/LinkButton';
import LogoText from './LogoText';
import MiniCart from '../cart/MiniCart';

const Header = () => {
  const { user, isLoading, logout } = useAuth();
  const { showCart, toggleCart } = useCart();

  return (
    <Box sx={{ height: 72 }}>
      <AppBar position="fixed" sx={{
        height: 'inherit',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
        backgroundColor: 'background.default',
        color: 'text.dark'
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
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
            {isLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : (
              user ? (
                <UserMenu />
              ) : (
                <>
                  <LinkButton to="/login" variant="outlined" sx={{ borderColor: 'text.faded', backgroundColor: 'background.default', color: 'text.dark' }}>
                    Log In
                  </LinkButton>
                  <LinkButton to="/register" variant="contained" disableElevation sx={{ backgroundColor: 'text.dark', color: 'background.default' }}>
                    Sign Up
                  </LinkButton>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const UserMenu = () => {
  const btn = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton ref={btn} onClick={handleMenuOpen} color="inherit">
        <Avatar src={user.avatar} alt={user.name.first + ' ' + user.name.last} />
      </IconButton>
      <Menu
        anchorEl={btn}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem component={Link} to="/profile" onClick={() => setIsOpen(false)}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders" onClick={() => setIsOpen(false)}>Orders</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
