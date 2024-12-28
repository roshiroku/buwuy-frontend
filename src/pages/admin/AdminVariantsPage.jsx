import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../../services/product.service';
import DataTable from '../../components/table/DataTable';
import { remoteAsset } from '../../utils/url.utils';

const AdminVariantsPage = () => {
  const { id } = useParams();
  const { product, saveProduct, isLoadingProduct } = useProduct(id);

  const columns = [
    {
      name: 'name',
      label: 'Variant',
      sortable: true,
      parse: ({ name, images }) => (
        <div>
          <img src={remoteAsset(images[0]?.src)} alt={name} style={{
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
      name: 'price',
      label: 'Price',
      sortable: true
    },
    {
      name: 'stock',
      label: 'Stock',
      sortable: true
    },
    {
      name: 'actions',
      parse: (variant) => (
        <div>
          <Link to={`/admin/products/${id}/variants/${product.variants.indexOf(variant)}`}>
            edit
          </Link>
          <button onClick={() => handleDelete(variant)}>delete</button>
        </div>
      )
    }
  ];

  const handleDelete = async (variant) => {
    if (!confirm('delete variant?')) return;
    product.variants = product.variants.filter((other) => other !== variant);
    await saveProduct();
  };

  return !isLoadingProduct && (
    <div>
      <Link to={`/admin/products/${id}/variant`}>Add Variant</Link>
      <DataTable columns={columns} rows={product.variants} />
    </div>
  );
};

export default AdminVariantsPage;
