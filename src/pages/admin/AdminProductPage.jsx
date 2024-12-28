import { useNavigate, useParams } from 'react-router-dom';
import productService, { useProduct } from '../../services/product.service';
import { useProductForm } from '../../schema/product.schema';
import { useCategories } from '../../providers/CategoryProvider';
import { useTags } from '../../providers/TagProvider';
import AutoComplete from '../../components/forms/AutoComplete';
import ImagesInput from '../../components/forms/ImagesInput';

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

  return !isLoadingProduct && (
    <form onSubmit={onSubmit} noValidate>
      {inputs.name}
      {inputs.description}
      {inputs.price}
      {inputs.stock}
      <AutoComplete
        value={values.category}
        onChange={handlers.category}
        options={categories.map((cat) => [cat._id, cat.name])}
      />
      <AutoComplete
        value={values.tags}
        onChange={handlers.tags}
        options={tags.map((tag) => [tag._id, tag.name])}
        multiple
      />
      <ImagesInput value={values.images} onChange={handlers.images} />
      <button type="submit">Save</button>
    </form>
  );
};

export default AdminProductPage;
