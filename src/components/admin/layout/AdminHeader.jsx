import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Divider } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../providers/AuthProvider';
import { useTheme } from '../../../providers/ThemeProvider';
import Logo from '../../layout/Logo';
import NavLink from '../../layout/NavLink';
import { remoteAsset } from '../../../utils/url.utils';

const AdminHeader = () => {
  const { user, isLoading, logout } = useAuth();
  const { themeMode, toggleThemeMode } = useTheme();
  const navigate = useNavigate();
  const userButtonRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const height = 72;

  return (
    <Box sx={{ height }}>
      <AppBar
        position="fixed"
        sx={{
          height,
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
          backgroundColor: 'background.default',
          color: 'text.header',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link
              to="/admin"
              style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'currentcolor' }}
            >
              <Logo style={{ width: 42 }} />
              <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                Admin Panel
              </Typography>
            </Link>
            {user?.role === 'admin' && (
              <NavLink to="/admin/users">
                <Typography variant="body1" fontWeight={500}>Users</Typography>
              </NavLink>
            )}
            {[
              { to: '/admin/categories', label: 'Categories' },
              { to: '/admin/tags', label: 'Tags' },
              { to: '/admin/products', label: 'Products' },
              { to: '/admin/orders', label: 'Orders' },
            ].map((link) => (
              <NavLink key={link.to} to={link.to}>
                <Typography variant="body1" fontWeight={500}>{link.label}</Typography>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton LinkComponent={Link} color="inherit" to="/">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={toggleThemeMode}>
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {isLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : (
              user && (
                <>
                  <IconButton ref={userButtonRef} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} color="inherit">
                    <Avatar src={remoteAsset(user.avatar)} alt={user.name} />
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
