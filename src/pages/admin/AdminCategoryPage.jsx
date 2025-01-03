import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid } from '@mui/material';
import { useCategoryForm } from '../../schema/category.schema';
import categoryService from '../../services/category.service';
import { useCategories } from '../../providers/CategoryProvider';
import ImageInput from '../../components/forms/ImageInput';

const AdminCategoryPage = () => {
  const { categories, setCategories, isLoadingCategories } = useCategories();
  const { id } = useParams();
  const category = categories.find(({ _id }) => _id === id);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await categoryService.save(data);

    if (id) {
      setCategories(categories.map((cat) => cat._id === res._id ? res : cat));
    } else {
      setCategories([...categories, res]);
    }

    navigate('/admin/categories');
  };

  const { values, errors, handlers, inputs, onSubmit } = useCategoryForm({ default: category, handleSubmit });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {isLoadingCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
              {id ? 'Edit Category' : 'Add New Category'}
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
              {id ? 'Update the category details below.' : 'Fill in the details for the new category.'}
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {inputs.name}
            {inputs.byline}
            {inputs.description}
            <ImageInput
              value={values.image}
              onChange={handlers.image}
              label="Image"
              error={errors.image}
            />
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

export default AdminCategoryPage;
