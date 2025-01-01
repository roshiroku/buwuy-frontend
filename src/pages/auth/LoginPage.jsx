import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Welcome To Buwuy
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium' }}>
          Log in below
        </Typography>
      </Box>
      <LoginForm />
      <Typography variant="body1">
        Don't have an account yet?{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main', fontWeight: 600 }}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
