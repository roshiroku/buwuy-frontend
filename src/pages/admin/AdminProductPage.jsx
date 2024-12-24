import { useParams } from 'react-router-dom';
import { useProduct } from '../../services/product.service';
import productSchema from '../../schema/product.schema';
import { useCategories } from '../../providers/CategoryProvider';
import { useTags } from '../../providers/TagProvider';
import Form from '../../components/forms/Form';
import AutoComplete from '../../components/forms/AutoComplete';

const AdminProductPage = () => {
  const { id } = useParams();
  const { product, isLoadingProduct } = useProduct(id);
  const { categories } = useCategories();
  const { tags } = useTags();

  return !isLoadingProduct && (
    <Form default={product} schema={productSchema}>
      {(value, onChange) => (
        <AutoComplete
          key="category"
          value={value}
          onChange={onChange}
          options={categories.map((cat) => [cat._id, cat.name])}
        />
      )}
      {(value, onChange) => (
        <AutoComplete
          key="tags"
          value={value}
          onChange={onChange}
          options={tags.map((tag) => [tag._id, tag.name])}
          multiple
        />
      )}
    </Form>
  );
};

export default AdminProductPage;
