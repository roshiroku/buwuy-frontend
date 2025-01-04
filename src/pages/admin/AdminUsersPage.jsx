import { useMemo } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import userService, { useUsers } from '../../services/user.service';
import DataTable from '../../components/table/DataTable';
import LinkButton from '../../components/buttons/LinkButton';
import { remoteAsset } from '../../utils/url.utils';
import { capitalize } from '../../utils/string.utils';

const AdminUsersPage = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '-createdAt';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const {
    users,
    getUsers,
    countUsers: count,
    isLoadingUsers
  } = useUsers({ skip: (page - 1) * limit, limit, sort });

  const handleDelete = async (id) => {
    if (!confirm('Delete user?')) return;
    await userService.delete(id);
    await getUsers();
  };

  const columns = useMemo(() => [
    {
      name: 'name',
      label: 'Name',
      sortable: true,
      primary: true,
      parse: ({ name, avatar }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={remoteAsset(avatar)}
            alt={name}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
        </Box>
      )
    },
    { name: 'email', label: 'Email', sortable: true },
    { name: 'role', label: 'Role', sortable: true, parse: ({ role }) => capitalize(role) },
    { name: 'phone', label: 'Phone' },
    {
      name: 'address',
      label: 'Address',
      parse: ({ address }) => address && `${address.street}, ${address.city}, ${address.country}`
    },
    { name: 'createdAt', label: 'Registered', sortable: true },
    {
      name: 'actions',
      parse: ({ _id, role }) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to={`/admin/users/${_id}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(_id)}
            sx={{ borderRadius: 2 }}
            disabled={role === 'admin'}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ], [users]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Users
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Manage user accounts, including profile details and contact information.
        </Typography>
      </Box>
      <LinkButton
        to="/admin/user"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
      >
        Add User
      </LinkButton>
      {isLoadingUsers ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={users} count={count} sort={sort} />
      )}
    </Box>
  );
};

export default AdminUsersPage;
