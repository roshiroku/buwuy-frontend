import { Box, CircularProgress, Grid2, Typography } from '@mui/material';
import { useCategories } from '../../providers/CategoryProvider';
import CategoryCard from '../../components/shop/CategoryCard';
import bestSellers from '../../assets/best-sellers.webp';

const ShopPage = () => {
  const { categories, isLoadingCategories } = useCategories();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
        Shop Categories
      </Typography>
      {isLoadingCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 container spacing={4}>
          {categories.map((category) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={category._id}>
              <CategoryCard to={`/shop/${category.slug}`} category={category} />
            </Grid2>
          ))}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <CategoryCard
              to="/shop/best-sellers"
              category={{
                name: 'Best Sellers',
                byline: 'Explore our top-selling products that customers love!',
                image: bestSellers
              }}
            />
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};

export default ShopPage;
