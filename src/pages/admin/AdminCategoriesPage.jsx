import { useCategories } from "../../providers/CategoryProvider";
import DataTable from "../../components/table/DataTable";
import { remoteAsset } from "../../utils/url.utils";

const AdminCategoriesPage = () => {
  const { categories, isLoadingCategories } = useCategories();

  const columns = [
    {
      name: 'name',
      label: 'Name',
      sortable: true,
      parse: ({ name, image }) => (
        <div>
          <img src={remoteAsset(image)} alt={name} style={{ display: 'block', width: '150px', aspectRatio: 1, objectFit: 'cover' }} />
          <span>{name}</span>
        </div>
      )
    },
    {
      name: 'description',
      label: 'Description'
    }
  ];

  return (
    <div>
      <DataTable columns={columns} rows={categories} />
    </div>
  );
};

export default AdminCategoriesPage;
