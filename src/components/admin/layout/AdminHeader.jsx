import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../layout/Logo';

const AdminHeader = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const userButtonRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ height: 72 }}>
      <AppBar position="fixed" sx={{
        height: 'inherit',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
        backgroundColor: 'background.default',
        color: 'text.dark'
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'currentcolor' }}>
              <Logo style={{ width: 42 }} />
              <Typography variant="h6" noWrap sx={{ flexShrink: 0, fontWeight: 600 }}>
                Admin Panel
              </Typography>
            </Link>
            <Link to="/admin/users" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Users</Typography>
            </Link>
            <Link to="/admin/categories" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Categories</Typography>
            </Link>
            <Link to="/admin/tags" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Tags</Typography>
            </Link>
            <Link to="/admin/products" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Products</Typography>
            </Link>
            <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Typography variant="body1">Orders</Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton LinkComponent={Link} color="inherit" to="/">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <DarkModeIcon />
            </IconButton>
            {isLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : (
              user && (
                <>
                  <IconButton ref={userButtonRef} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} color="inherit">
                    <Avatar src={user.avatar} alt={user.name} />
                  </IconButton>
                  <Menu
                    anchorEl={userButtonRef.current}
                    open={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                  >
                    <MenuItem onClick={() => setIsUserMenuOpen(false)}>Profile</MenuItem>
                    <MenuItem onClick={() => setIsUserMenuOpen(false)}>Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ marginRight: 1 }} /> Log Out
                    </MenuItem>
                  </Menu>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminHeader;
