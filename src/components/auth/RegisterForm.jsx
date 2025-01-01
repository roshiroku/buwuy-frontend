import { Box, Button } from '@mui/material';
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
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {inputs.name}
      {inputs.email}
      {inputs.password}
      <ImageInput value={values.avatar} onChange={handlers.avatar} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: 2 }}
      >
        Create Free Account
      </Button>
    </Box>
  );
};

export default RegisterForm;
