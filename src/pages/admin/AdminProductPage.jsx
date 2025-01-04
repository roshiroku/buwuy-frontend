import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import productService, { useProduct } from '../../services/product.service';
import { useProductForm } from '../../schema/product.schema';
import { useCategories } from '../../providers/CategoryProvider';
import { useTags } from '../../providers/TagProvider';
import ImagesInput from '../../components/forms/ImagesInput';
import Autocomplete from '../../components/forms/Autocomplete';

const AdminProductPage = () => {
  const { id } = useParams();
  const { product, isLoadingProduct } = useProduct(id);
  const { categories } = useCategories();
  const { tags } = useTags();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await productService.save(values);
    navigate('/admin/products');
  };

  const {
    values,
    errors,
    handlers,
    inputs,
    onSubmit
  } = useProductForm({ default: product, handleSubmit });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {isLoadingProduct ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
              {id ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
              {id ? 'Update the product details below.' : 'Fill in the details for the new product.'}
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              {inputs.price}
              {inputs.stock}
            </Box>
            <Autocomplete
              options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
              value={values.category}
              onChange={handlers.category}
              label="Category"
              error={errors.category}
            />
            <Autocomplete
              options={tags.map((tag) => ({ value: tag._id, label: tag.name }))}
              value={values.tags}
              onChange={handlers.tags}
              label="Tags"
              error={errors.tags}
              multiple
            />
            <ImagesInput
              value={values.images}
              onChange={handlers.images}
              label="Product Images"
              error={errors.images}
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

export default AdminProductPage;
