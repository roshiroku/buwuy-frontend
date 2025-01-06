import { Link } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useCart } from '../../providers/CartProvider';
import CartItemList from './CartItemList';
import LinkButton from '../buttons/LinkButton';
import { toCurrency } from '../../utils/number.utils';

const Cart = () => {
  const { cart, subtotal, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}>
        <Typography variant="h6" color="text.medium">
          Your cart is empty.
        </Typography>
        <LinkButton
          to="/shop"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Go to Shop
        </LinkButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Your Cart
      </Typography>
      <Divider />
      <CartItemList items={cart.items} />
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Subtotal:
        </Typography>
        <Typography variant="body1">
          {toCurrency(subtotal)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={clearCart}
          sx={{ borderRadius: 2 }}
        >
          Clear Cart
        </Button>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
