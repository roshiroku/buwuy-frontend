import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid2 as Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../services/product.service';
import ProductCard from '../../components/shop/ProductCard';
import Pagination from '../../components/layout/Pagination';
import SearchForm from '../../components/shop/SearchForm';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const sort = searchParams.get('sort') || 'name';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const search = searchParams.get('q') || '';
  const tagSlugs = searchParams.getAll('tags');

  const { products, countProducts, isLoadingProducts } = useProducts({
    q: search,
    tags: tagSlugs,
    skip: (page - 1) * limit,
    limit,
    sort
  });

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Search Results
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.secondary', maxWidth: 800 }}>
          Discover products that match your search query.
        </Typography>
      </Box>

      <SearchForm
        value={searchInput}
        onInput={setSearchInput}
        onChange={(params) => setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...params })}
        tags={tagSlugs?.filter(Boolean)}
      />

      {isLoadingProducts ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                    <ProductCard to={`/shop/${product.category?.slug}/${product.slug}`} product={product} />
                  </Grid>
                ))}
              </Grid>
              <Pagination count={countProducts} page={page} limit={limit} />
            </>
          ) : (
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No products found. Try a different search term.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchPage;
