import { useNavigate, useParams } from 'react-router-dom';
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

  const { values, handlers, inputs, onSubmit } = useCategoryForm({ default: category, handleSubmit });

  return !isLoadingCategories && (
    <form onSubmit={onSubmit} noValidate>
      {inputs.name}
      {inputs.description}
      <ImageInput value={values.image} onChange={handlers.image} />
      <button type="submit">Save</button>
    </form>
  );
};

export default AdminCategoryPage;
