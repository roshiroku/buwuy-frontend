import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  return (
    <LoginForm onSuccess={() => navigate('/admin')} />
  );
};

export default AdminLoginPage;
