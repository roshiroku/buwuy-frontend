import { useAuth } from '../../providers/AuthProvider';
import { useRegisterForm } from '../../schema/register.schema';
import { inflateObject } from '../../utils/object.utils';
import ImageInput from '../forms/ImageInput';

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();

  const handleSubmit = async (data) => {
    data = inflateObject(data);
    await register(data);
    onSuccess && onSuccess();
  };

  const { values, handlers, inputs, onSubmit } = useRegisterForm({ handleSubmit });

  return (
    <form onSubmit={onSubmit}>
      {inputs['name.first']}
      {inputs['name.last']}
      {inputs.email}
      {inputs.password}
      <ImageInput value={values.avatar} onChange={handlers.avatar} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
