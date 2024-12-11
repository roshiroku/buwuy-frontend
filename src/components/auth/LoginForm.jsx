import { useAuth } from '../../providers/AuthProvider';
import loginSchema from '../../schema/login.schema';
import Form from '../forms/Form';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    await login(email, password);
    onSuccess && onSuccess();
  };

  return (
    <Form schema={loginSchema} onSubmit={handleSubmit} />
  );
};

export default LoginForm;
