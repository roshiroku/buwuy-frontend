import { useNavigate, useParams } from 'react-router-dom';
import categorySchema from '../../schema/category.schema';
import categoryService from '../../services/category.service';
import { useCategories } from '../../providers/CategoryProvider';
import Form from '../../components/forms/Form';

const AdminCategoryPage = () => {
  const { categories, setCategories, isLoadingCategories } = useCategories();
  const { id } = useParams();
  const category = categories.find(({ _id }) => _id === id);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await categoryService.save(data);

    if (id){
      setCategories(categories.map((cat) => cat._id === res._id ? res : cat));
    } else {
      setCategories([...categories, res]);
    }
    
    navigate('/admin/categories');
  };

  return !isLoadingCategories && (
    <Form default={category} schema={categorySchema} onSubmit={handleSubmit} />
  );
};

export default AdminCategoryPage;
