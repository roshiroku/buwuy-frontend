import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <LoginForm onSuccess={() => navigate('/')} />
  );
};

export default LoginPage;
