import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Create Free Account
        </Typography>
      </Box>
      <RegisterForm />
      <Typography variant="body1">
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main', fontWeight: 600 }}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
