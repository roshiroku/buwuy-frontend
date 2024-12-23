import { Link } from 'react-router-dom';
import categoryService from '../../services/category.service';
import { useCategories } from '../../providers/CategoryProvider';
import DataTable from '../../components/table/DataTable';
import { remoteAsset } from '../../utils/url.utils';

const AdminCategoriesPage = () => {
  const { categories, setCategories, isLoadingCategories } = useCategories();

  const columns = [
    {
      name: 'name',
      label: 'Category',
      sortable: true,
      parse: ({ name, image }) => (
        <div>
          <img src={remoteAsset(image)} alt={name} style={{
            display: 'block',
            width: '150px',
            aspectRatio: 1,
            objectFit: 'cover'
          }} />
          <span>{name}</span>
        </div>
      )
    },
    {
      name: 'description',
      label: 'Description'
    },
    {
      name: 'createdAt',
      label: 'Created',
      sortable: true
    },
    {
      name: 'actions',
      parse: ({ _id }) => (
        <div>
          <Link to={`/admin/categories/${_id}`}>edit</Link>
          <button onClick={() => handleDelete(_id)}>delete</button>
        </div>
      )
    }
  ];

  const handleDelete = async (id) => {
    if (!confirm('delete category?')) return;
    await categoryService.delete(id);
    setCategories(categories.filter(({ _id }) => _id !== id));
  };

  return (
    <div>
      <Link to="/admin/category">Add Category</Link>
      <DataTable columns={columns} rows={categories} />
    </div>
  );
};

export default AdminCategoriesPage;
