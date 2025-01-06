import { Box, Typography, CircularProgress } from '@mui/material';
import { useProducts } from '../../services/product.service';
import Container from '../layout/Container';
import ProductCarousel from '../shop/ProductCarousel';

const BestSellersSection = () => {
  const { products, isLoadingProducts } = useProducts({ sort: '-sold', skip: 0, limit: 4 });

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center' }}>
        Our Best Sellers
      </Typography>
      {isLoadingProducts ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductCarousel products={products} />
      )}
    </Container>
  );
};

export default BestSellersSection;
