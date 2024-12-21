import { useAuth } from '../../providers/AuthProvider';
import registerSchema from '../../schema/register.schema';
import { inflateObject } from '../../utils/object.utils';
import Form, { SubmitButton } from '../forms/Form';

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();

  const handleSubmit = async (data) => {
    data = inflateObject(data);
    await register(data);
    onSuccess && onSuccess();
  };

  return (
    <Form schema={registerSchema} onSubmit={handleSubmit}>
      <SubmitButton>Register</SubmitButton>
    </Form>
  );
};

export default RegisterForm;
