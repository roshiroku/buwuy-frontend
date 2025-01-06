import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../layout/Logo';
import { useAuth } from '../../../providers/AuthProvider';

const AdminFooter = () => {
  const linkStyle = {
    color: 'text.medium',
    textDecoration: 'none',
    '&:hover': {
      color: 'text.primary'
    }
  };

  const { user } = useAuth();

  return (
    <Box
      component="footer"
      sx={({ palette }) => ({
        py: 4,
        px: { xs: 2, sm: 3 },
        backgroundColor: 'background.default',
        color: 'text.header',
        boxShadow: palette.mode === 'dark' ? (
          '0px 256px 512px rgba(255, 255, 255, 0.16), 0px 128px 256px rgba(255, 255, 255, 0.08)'
        ) : (
          '0px 256px 512px rgba(0, 0, 0, 0.48), 0px 128px 256px rgba(0, 0, 0, 0.24)'
        )
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <Logo style={{ height: 128, width: 128 }} />
          <Typography variant="body1" sx={{ maxWidth: 300 }}>
            Manage Buwuy with ease and precision. Built with ❤️.
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.medium">
            © Buwuy {new Date().getFullYear()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>Quick Links</Typography>
          <MuiLink component={Link} to="/admin" sx={linkStyle}>
            Dashboard
          </MuiLink>
          {user?.role === 'admin' && (
            <MuiLink component={Link} to="/admin/users" sx={linkStyle}>
              Users
            </MuiLink>
          )}
          <MuiLink component={Link} to="/admin/categories" sx={linkStyle}>
            Categories
          </MuiLink>
          <MuiLink component={Link} to="/admin/tags" sx={linkStyle}>
            Tags
          </MuiLink>
          <MuiLink component={Link} to="/admin/products" sx={linkStyle}>
            Products
          </MuiLink>
          <MuiLink component={Link} to="/admin/orders" sx={linkStyle}>
            Orders
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminFooter;
