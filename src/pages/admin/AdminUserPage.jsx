import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid } from '@mui/material';
import Schema from '../../schema/Schema';
import { userFields } from '../../schema/user.schema';
import userService, { useUser } from '../../services/user.service';
import ImageInput from '../../components/forms/ImageInput';
import useSchemaForm from '../../hooks/useSchemaForm';
import { deflateObject, inflateObject } from '../../utils/object.utils';

const AdminUserPage = () => {
  const { id } = useParams();
  const { user, isLoadingUser } = useUser(id);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await userService.save(inflateObject(values));
    navigate('/admin/users');
  };

  const userSchema = useMemo(() => {
    userFields.password.required = !user;
    return new Schema(userFields);
  }, [user]);

  const defaultValue = useMemo(() => deflateObject(user, 1), [user]);

  const {
    values,
    errors,
    handlers,
    inputs,
    onSubmit
  } = useSchemaForm(userSchema, {
    default: defaultValue,
    handleSubmit
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {isLoadingUser ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
              {id ? 'Edit User' : 'Add New User'}
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
              {id ? 'Update the user details below.' : 'Fill in the details for the new user.'}
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.name}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.role}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.email}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.password}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.phone}
              </Grid>
            </Grid>
            <ImageInput
              value={values.avatar}
              onChange={handlers.avatar}
              label="Avatar"
              error={errors.avatar}
            />
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', mt: 2 }}>
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.country']}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.state']}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.city']}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.street']}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.apt']}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs['address.zip']}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminUserPage;
