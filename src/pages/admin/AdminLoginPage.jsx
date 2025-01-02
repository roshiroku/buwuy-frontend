import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';

const AdminLoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Admin Panel Login
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium' }}>
          Please log in with your admin credentials
        </Typography>
      </Box>
      <LoginForm onSuccess={() => navigate('/admin')} />
    </Box>
  );
};

export default AdminLoginPage;
