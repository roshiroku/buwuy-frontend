import { useMemo } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import categoryService from '../../services/category.service';
import { useCategories } from '../../providers/CategoryProvider';
import DataTable from '../../components/table/DataTable';
import LinkButton from '../../components/buttons/LinkButton';
import { remoteAsset } from '../../utils/url.utils';

const AdminCategoriesPage = () => {
  const { categories, isLoadingCategories, setCategories } = useCategories();

  const handleDelete = async (id) => {
    if (!confirm('Delete category?')) return;
    await categoryService.delete(id);
    setCategories(categories.filter(({ _id }) => _id !== id));
  };

  const columns = useMemo(() => [
    {
      name: 'name',
      label: 'Category',
      sortable: true,
      primary: true,
      parse: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            variant="square"
            src={remoteAsset(row.image)}
            alt={row.name}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {row.name}
          </Typography>
        </Box>
      )
    },
    { name: 'byline', label: 'Byline' },
    {
      name: 'actions',
      parse: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            component={Link}
            to={`/admin/categories/${row._id}`}
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
            onClick={() => handleDelete(row._id)}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ], [categories]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Categories
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Organize and manage product categories to enhance the shopping experience on your platform.
        </Typography>
      </Box>
      <LinkButton
        to="/admin/category"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
      >
        Add Category
      </LinkButton>
      {isLoadingCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={categories} count={categories.length} />
      )}
    </Box>
  );
};

export default AdminCategoriesPage;
