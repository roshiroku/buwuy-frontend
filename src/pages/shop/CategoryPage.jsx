import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Grid2, Typography } from '@mui/material';
import { useProducts } from '../../services/product.service';
import { useCategories } from '../../providers/CategoryProvider';
import ProductCard from '../../components/shop/ProductCard';
import Pagination from '../../components/layout/Pagination';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const sort = searchParams.get('sort') || 'name';
  const { categories, isLoadingCategories } = useCategories();
  const { products, countProducts, isLoadingProducts } = useProducts({
    categorySlug,
    skip: (page - 1) * limit,
    limit,
    sort
  });

  const category = useMemo(() => categories.find(({ slug }) => slug === categorySlug), [
    categories,
    categorySlug
  ]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          {isLoadingCategories ? 'Loading...' : category?.name}
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          {isLoadingCategories ? 'Loading...' : category?.description}
        </Typography>
      </Box>
      {isLoadingCategories || isLoadingProducts ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid2 container spacing={4}>
            {products.map((product) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                <ProductCard to={`/shop/${categorySlug}/${product.slug}`} product={product} />
              </Grid2>
            ))}
          </Grid2>
          <Pagination count={countProducts} page={page} limit={limit} />
        </>
      )}
    </Box>
  );
};

export default CategoryPage;
