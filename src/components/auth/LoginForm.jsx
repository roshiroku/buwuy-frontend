import { useAuth } from '../../providers/AuthProvider';
import { useLoginForm } from '../../schema/login.schema';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    await login(email, password);
    onSuccess && onSuccess();
  };

  const { inputs, onSubmit } = useLoginForm({ handleSubmit });

  return (
    <form onSubmit={onSubmit}>
      {inputs.email}
      {inputs.password}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
