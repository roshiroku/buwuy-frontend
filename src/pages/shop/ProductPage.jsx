import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import { useProduct, useProducts } from '../../services/product.service';
import { useCart } from '../../providers/CartProvider';
import ProductImages from '../../components/shop/ProductImages';
import { toCurrency } from '../../utils/number.utils';

const ProductPage = () => {
  const { updateCart, openCart } = useCart();
  const { productSlug: slug } = useParams();
  const { products } = useProducts({ slug, limit: 1 });
  const { product } = useProduct(products[0]);
  const isLoading = useMemo(() => !product, [product]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ProductImages images={product.images || []} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" component="div" color="text.medium" sx={{ /*maxWidth: 400, '& > p': { m: 0 }*/ }}>
                <Markdown>{product.description}</Markdown>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Price: {toCurrency(product.price)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!product.stock}
                  onClick={() => updateCart(product, 1) && openCart()}
                  sx={{ borderRadius: 2 }}
                >
                  {product.stock ? 'Add To Cart' : 'Out Of Stock'}
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductPage;
