import { useAuth } from '../../providers/AuthProvider';
import { useRegisterForm } from '../../schema/register.schema';
import { inflateObject } from '../../utils/object.utils';

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();

  const handleSubmit = async (data) => {
    data = inflateObject(data);
    await register(data);
    onSuccess && onSuccess();
  };

  const { inputs, onSubmit } = useRegisterForm({ handleSubmit });

  return (
    <form onSubmit={onSubmit}>
      {Object.values(inputs)}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
