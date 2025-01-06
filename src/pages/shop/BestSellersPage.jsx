import { Box, Typography, CircularProgress, Grid2 as Grid } from '@mui/material';
import { useProducts } from '../../services/product.service';
import ProductCard from '../../components/shop/ProductCard';

const BestSellersPage = () => {
  const { products, isLoadingProducts } = useProducts({
    sort: '-sold',
    skip: 0,
    limit: 10
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Best Sellers
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Discover the top-selling products in our collection.
        </Typography>
      </Box>

      {isLoadingProducts ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {products.length > 0 ? (
            <Grid container spacing={4}>
              {products.map((product, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                  <Box sx={{ position: 'relative' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        p: '4px 8px',
                        borderRadius: 4,
                        fontWeight: 600,
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                    >
                      #{index + 1}
                    </Typography>
                    <ProductCard to={`/shop/${product.category?.slug}/${product.slug}`} product={product} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" color="text.medium" sx={{ textAlign: 'center', mt: 4 }}>
              No products found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default BestSellersPage;
