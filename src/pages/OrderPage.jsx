import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import { useOrder } from '../services/order.service';
import { useProducts } from '../services/product.service';
import { toCurrency } from '../utils/number.utils';
import { capitalize } from '../utils/string.utils';
import { remoteAsset } from '../utils/url.utils';

const OrderPage = () => {
  const { id } = useParams();
  const { order, isLoadingOrder } = useOrder(id);

  const queryParams = useMemo(() => (
    order ? { _id: order.items.map(({ product }) => product) } : null
  ), [order]);

  const { products } = useProducts(queryParams);

  if (!isLoadingOrder && !order) {
    return <Navigate to="/404" replace />;
  }

  const items = useMemo(() => (
    order?.items.map(({ product, name, price, amount }) => {
      const productData = products.find(p => p._id === product);
      return {
        name,
        image: remoteAsset(productData?.images[0]?.src),
        price: toCurrency(price),
        amount,
        total: toCurrency(price * amount)
      };
    })
  ), [order, products]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {isLoadingOrder ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
              Order Details
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.medium' }}>
              Order #{order._id.slice(-6).toUpperCase()} - {capitalize(order.status)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Items
              </Typography>
              {items?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'background.cardBorder',
                    borderRadius: 2,
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  {item.image && (
                    <Avatar variant="square" src={item.image} alt={item.name} sx={{ width: 64, height: 64 }} />
                  )}
                  <Typography variant="body1" flex={3}>{item.name}</Typography>
                  <Typography variant="body1" flex={1} sx={{ textAlign: 'right' }}>{item.price}</Typography>
                  <Typography variant="body1" flex={1} sx={{ textAlign: 'right' }}>x{item.amount}</Typography>
                  <Typography variant="body1" flex={1} sx={{ textAlign: 'right', fontWeight: 600 }}>{item.total}</Typography>
                </Box>
              ))}
            </Box>
            {order.client && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Client Information
                </Typography>
                <Typography variant="body1">
                  {order.client.name.first} {order.client.name.last}<br />
                  {order.client.email}<br />
                  {order.client.phone}
                </Typography>
              </Box>
            )}
            {order.address && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Shipping Address
                </Typography>
                <Typography variant="body1">
                  {order.address.street}, Apt. {order.address.apt}<br />
                  {order.address.city}, {order.address.state}<br />
                  {order.address.country} - {order.address.zip}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Summary
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Subtotal: {toCurrency(order.subtotal)}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrderPage;
