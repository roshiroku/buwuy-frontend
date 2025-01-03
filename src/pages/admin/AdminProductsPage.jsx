import { useMemo } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import productService, { useProducts } from '../../services/product.service';
import DataTable from '../../components/table/DataTable';
import LinkButton from '../../components/buttons/LinkButton';
import { remoteAsset } from '../../utils/url.utils';

const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'name';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const {
    products,
    getProducts,
    countProducts: count,
    isLoadingProducts
  } = useProducts({ skip: (page - 1) * limit, limit, sort });

  const handleDelete = async (id) => {
    if (!confirm('Delete product?')) return;
    await productService.delete(id);
    await getProducts();
  };

  const columns = useMemo(() => [
    {
      name: 'name',
      label: 'Product',
      sortable: true,
      primary: true,
      parse: ({ name, images }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            variant="square"
            src={remoteAsset(images[0]?.src)}
            alt={name}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
        </Box>
      )
    },
    {
      name: 'category',
      label: 'Category',
      sortable: true,
      parse: ({ category }) => category?.name
    },
    { name: 'byline', label: 'Byline' },
    { name: 'price', label: 'Price', sortable: true },
    { name: 'stock', label: 'Stock', sortable: true },
    { name: 'sold', label: 'Sold', sortable: true },
    { name: 'createdAt', label: 'Created', sortable: true },
    {
      name: 'actions',
      parse: ({ _id }) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to={`/admin/products/${_id}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(_id)}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ], [products]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Products
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Manage your product catalog, including prices, stock, and descriptions.
        </Typography>
      </Box>
      <LinkButton
        to="/admin/product"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
      >
        Add Product
      </LinkButton>
      {isLoadingProducts ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={products} count={count} />
      )}
    </Box>
  );
};

export default AdminProductsPage;
