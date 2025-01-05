import { useMemo } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import orderService, { useOrders } from '../../services/order.service';
import DataTable from '../../components/table/DataTable';
import { toCurrency } from '../../utils/number.utils';
import { capitalize } from '../../utils/string.utils';

const AdminOrdersPage = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '-createdAt';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const {
    orders,
    getOrders,
    countOrders: count,
    isLoadingOrders
  } = useOrders({ skip: (page - 1) * limit, limit, sort });

  const handleDelete = async (id) => {
    if (!confirm('Delete order?')) return;
    await orderService.delete(id);
    await getOrders();
  };

  const columns = useMemo(() => [
    {
      name: 'name',
      label: 'Customer',
      sortable: true,
      parse: ({ contact }) => `${contact.name.first} ${contact.name.last}`
    },
    {
      name: 'email',
      label: 'Email',
      sortable: true,
      parse: ({ contact }) => contact.email
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to={`/admin/orders/${order._id}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(order._id)}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ], [orders]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Orders
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Manage and track customer orders, including their statuses and details.
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

export default AdminOrdersPage;
