import { Box, Button } from '@mui/material';
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
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {inputs.email}
      {inputs.password}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: 2, mt: 2 }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
