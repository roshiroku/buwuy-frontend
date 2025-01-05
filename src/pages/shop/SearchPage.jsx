import { useState } from 'react';
import { Box, Typography, CircularProgress, Grid2 as Grid, InputAdornment, Button, Divider } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../services/product.service';
import { useTags } from '../../providers/TagProvider';
import Input from '../../components/forms/Input';
import Autocomplete from '../../components/forms/Autocomplete';
import ProductCard from '../../components/shop/ProductCard';
import Pagination from '../../components/layout/Pagination';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const { tags } = useTags();

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

  const handleSearch = (e) => {
    e.preventDefault();
    const params = { q: searchInput, page: 1, sort };
    if (tagSlugs.length) params.tags = tagSlugs;
    setSearchParams(params);
  };

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

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 2
        }}
      >
        <Autocomplete
          options={tags.map((tag) => ({ value: tag.slug, label: tag.name }))}
          value={tagSlugs}
          onChange={(value) => setSearchParams({ q: searchInput, tags: value, page: 1, sort })}
          placeholder="Filter by Tags"
          multiple
          sx={{ flex: 1 }}
        />
        <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' } }}>
          Or
        </Typography>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, alignItems: 'center' }}>
          <Divider sx={{ flexGrow: 1, borderColor: 'background.cardBorder' }} />
          <Typography
            variant="body2"
            sx={{
              color: 'text.faded',
              textTransform: 'uppercase',
              lineHeight: 1
            }}
          >
            Or
          </Typography>
          <Divider sx={{ flexGrow: 1, borderColor: 'background.cardBorder' }} />
        </Box>
        <Input
          value={searchInput}
          onChange={(value) => setSearchInput(value)}
          placeholder="Search products..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }
          }}
          sx={{ flex: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          Search
        </Button>
      </Box>

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
