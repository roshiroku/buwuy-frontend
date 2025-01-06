import { Navigate, Link, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useOrder } from '../../services/order.service';

const CheckoutSuccessPage = () => {
  const { id } = useParams();
  const { order, isLoadingOrder } = useOrder(id);

  if (!(isLoadingOrder || order)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4, textAlign: 'center' }}>
      {isLoadingOrder ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
            Thank You for Your Purchase!
          </Typography>
          <Typography variant="h6" component="p" sx={{ color: 'text.medium' }}>
            Your order has been successfully placed. You can track your order status or continue shopping.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
            <Button
              component={Link}
              to={`/orders/${id}`}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Track Order
            </Button>
            <Button
              component={Link}
              to="/shop"
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CheckoutSuccessPage;
