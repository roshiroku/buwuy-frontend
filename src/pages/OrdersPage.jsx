import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useOrders } from '../services/order.service';
import { useAuth } from '../providers/AuthProvider';
import DataTable from '../components/table/DataTable';
import { toCurrency } from '../utils/number.utils';
import { capitalize } from '../utils/string.utils';

const OrdersPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '-createdAt';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  const queryParams = useMemo(() => (
    user ? { user: user._id, skip: (page - 1) * limit, limit, sort } : null
  ), [user, page, limit, sort]);

  const {
    orders,
    getOrders,
    countOrders: count,
    isLoadingOrders
  } = useOrders(queryParams);

  const columns = useMemo(() => [
    {
      name: 'id',
      label: 'Order',
      parse: (order) => `#${order._id.slice(-6).toUpperCase()}`
    },
    {
      name: 'subtotal',
      label: 'Subtotal',
      sortable: true,
      parse: ({ subtotal }) => toCurrency(subtotal)
    },
    {
      name: 'status',
      label: 'Status',
      sortable: true,
      parse: ({ status }) => capitalize(status)
    },
    {
      name: 'createdAt',
      label: 'Ordered',
      sortable: true,
      parse: ({ createdAt }) => new Date(createdAt).toLocaleDateString()
    },
    {
      name: 'actions',
      parse: (order) => (
        <Button
          component={Link}
          to={`/orders/${order._id}`}
          variant="contained"
          color="primary"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          View Details
        </Button>
      )
    }
  ], []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          My Orders
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          View your order history and track the status of your purchases.
        </Typography>
      </Box>
      {isLoadingOrders ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={orders} count={count} sort={sort} />
      )}
    </Box>
  );
};

export default OrdersPage;
