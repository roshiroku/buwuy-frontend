import { Link, useSearchParams } from 'react-router-dom';
import productService, { useProducts } from '../../services/product.service';
import DataTable from '../../components/table/DataTable';
import { remoteAsset } from '../../utils/url.utils';

const AdminProductsPage = () => {
  /** @todo use url params */
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'name';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const {
    products,
    setProducts,
    countProducts: count,
    setCountProducts: setCount,
    isLoadingProducts
  } = useProducts({ skip: (page - 1) * limit, limit, sort });

  const columns = [
    {
      name: 'name',
      label: 'Product',
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
      name: 'createdAt',
      label: 'Created',
      sortable: true
    },
    {
      name: 'actions',
      parse: ({ _id }) => (
        <div>
          <Link to={`/admin/products/${_id}/variants`}>variants</Link>
          <Link to={`/admin/products/${_id}`}>edit</Link>
          <button onClick={() => handleDelete(_id)}>delete</button>
        </div>
      )
    }
  ];

  const handleDelete = async (id) => {
    if (!confirm('delete product?')) return;
    await productService.delete(id);
    setProducts(products.filter(({ _id }) => _id !== id));
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <Link to="/admin/product">Add Product</Link>
      <DataTable columns={columns} rows={products} count={count} />
    </div>
  );
};

export default AdminProductsPage;
