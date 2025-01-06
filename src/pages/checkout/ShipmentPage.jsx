import { useMemo, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid } from '@mui/material';
import shipmentSchema, { useShipmentForm } from '../../schema/shipment.schema';
import cartService from '../../services/cart.service';
import * as checkoutService from '../../services/checkout.service';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import { deflateObject, inflateObject, pick } from '../../utils/object.utils';

const ShipmentPage = () => {
  const isComplete = useRef(false);
  const { user } = useAuth();
  const { cart, isLoadingCart, clearCart } = useCart();
  const navigate = useNavigate();

  const defaultValues = useMemo(() => {
    const [first = '', ...last] = user?.name.split(' ') || [];
    return {
      ...shipmentSchema.empty(),
      ...pick(deflateObject({
        client: {
          'name.first': first,
          'name.last': last.pop() || '',
          ...user
        },
        address: user?.address
      }, 1), ...shipmentSchema.items.map(({ name }) => name))
    };
  }, [user]);

  const handleSubmit = async (values) => {
    const data = { ...inflateObject(values), cart: cartService.normalize(cart) };
    const { _id } = await checkoutService.startCheckout(data);
    isComplete.current = true;
    await clearCart();
    navigate(`/checkout/payment/${_id}`);
  };

  const { inputs, onSubmit } = useShipmentForm({ default: defaultValues, handleSubmit });

  if (!isComplete.current && !isLoadingCart && cart?.items.length === 0) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Shipment Information
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Please provide your contact and shipping details.
        </Typography>
      </Box>
      {isLoadingCart ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['client.name.first']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['client.name.last']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['client.email']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['client.phone']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.country']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.state']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.city']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.street']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.apt']}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {inputs['address.zip']}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Proceed To Payment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ShipmentPage;
