import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid } from '@mui/material';
import { usePaymentForm } from '../../schema/payment.schema';
import * as checkoutService from '../../services/checkout.service';
import { toCurrency } from '../../utils/number.utils';

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadOrder = async () => {
    try {
      setIsLoading(true);
      const order = await checkoutService.getCheckout(id);
      setOrder(order);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    await checkoutService.finishCheckout(id, values);
    navigate(`/checkout/success/${id}`);
  };

  const { inputs, onSubmit } = usePaymentForm({ handleSubmit });

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (!(isLoading || order)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Payment
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Complete your payment to finalize your order.
        </Typography>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total:
            </Typography>
            <Typography variant="h6">
              {toCurrency(order.subtotal)}
            </Typography>
          </Box>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                {inputs.cc}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.expiration}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {inputs.cvv}
              </Grid>
              <Grid size={12}>
                {inputs.name}
              </Grid>
              <Grid size={12}>
                {inputs.identification}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Confirm Payment
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PaymentPage;
