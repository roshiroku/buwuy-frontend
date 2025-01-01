import { Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useCart } from '../../providers/CartProvider';
import CartItemList from '../../components/cart/CartItemList';
import { toCurrency } from '../../utils/number.utils';

const CheckoutPage = () => {
  const { cart, subtotal, isLoadingCart } = useCart();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Checkout
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Review your cart and proceed to payment.
        </Typography>
      </Box>
      {isLoadingCart ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : cart.products.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Go to Shop
          </Button>
        </Box>
      ) : (
        <>
          <CartItemList items={cart.products} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Subtotal:
            </Typography>
            <Typography variant="h6">
              {toCurrency(subtotal)}
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/checkout/shipment"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Proceed to Shipment
          </Button>
        </>
      )}
    </Box>
  );
};

export default CheckoutPage;
