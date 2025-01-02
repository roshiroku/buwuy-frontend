import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCategories } from '../../providers/CategoryProvider';
import { useCart } from '../../providers/CartProvider';
import Input from '../forms/Input';
import { remoteAsset } from '../../utils/url.utils';
import { toCurrency } from '../../utils/number.utils';

const CartItemList = ({ items = [], onChange }) => {
  const { getCategory } = useCategories();
  const { updateCart } = useCart();
  onChange ||= updateCart;

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 0 }}>
      {items.map(({ product, amount }) => (
        <ListItem key={product._id} alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 0 }}>
          <ListItemAvatar sx={{ m: 0 }}>
            <Avatar
              variant="square"
              src={remoteAsset(product.images[0]?.src) || 'https://placehold.co/150?text=No+Image'}
              alt={product.name}
              sx={{ width: 64, height: 64, objectFit: 'cover' }}
            />
          </ListItemAvatar>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <ListItemText
              primary={
                <Link to={`/shop/${getCategory(product.category)?.slug}/${product.slug}`} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block'
                }}>
                  {product.name}
                </Link>
              }
              secondary={`Price: ${toCurrency(product.price)}`}
              slotProps={{ secondary: { sx: { color: 'text.medium' } } }}
            />
          </Box>
          <Box sx={{ width: 72, flexShrink: 0 }}>
            <Input
              type="number"
              min={1}
              max={product.stock}
              value={amount}
              onChange={(value) => {
                if (value > 0 && value <= product.stock) {
                  onChange(product, value - amount);
                }
              }}
            />
          </Box>
          <Box sx={{ width: 56, flexShrink: 0 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {toCurrency(product.price * amount)}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onChange(product, -amount)} aria-label="Remove">
              <CloseIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default CartItemList;
