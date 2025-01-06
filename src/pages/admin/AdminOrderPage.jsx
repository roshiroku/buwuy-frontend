import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid, List, ListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useOrderForm } from '../../schema/order.schema';
import orderService, { useOrder } from '../../services/order.service';
import { useProducts } from '../../services/product.service';
import Autocomplete from '../../components/forms/Autocomplete';
import Input from '../../components/forms/Input';
import { deflateObject, inflateObject } from '../../utils/object.utils';

const OrderItemList = ({ items, onChange, products }) => {
  const productOptions = useMemo(() => products.map((p) => ({ value: p._id, label: p.name })), [products]);

  const handleUpdateItem = (i, item) => {
    const updated = [...items];
    updated[i] = item;
    onChange(updated);
  };

  const handleRemoveItem = (i) => onChange(items.filter((_, j) => j !== i));

  const handleAddItem = () => {
    onChange([...items, { product: '', name: '', price: 0, amount: 1 }]);
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Autocomplete
            options={productOptions}
            value={item.product}
            onChange={(value) =>
              handleUpdateItem(index, {
                ...item,
                product: value,
                name: products.find((p) => p._id === value)?.name || item.name,
                price: products.find((p) => p._id === value)?.price || item.price
              })
            }
            label="Product"
            sx={{ flex: 2 }}
          />
          <Input
            label="Product Name"
            value={item.name}
            onChange={(value) => handleUpdateItem(index, { ...item, name: value })}
            sx={{ flex: 2 }}
          />
          <Input
            type="number"
            label="Price"
            value={item.price}
            onChange={(value) => handleUpdateItem(index, { ...item, price: value })}
            sx={{ flex: 1 }}
          />
          <Input
            type="number"
            label="Amount"
            value={item.amount}
            onChange={(value) => handleUpdateItem(index, { ...item, amount: value })}
            sx={{ flex: 1 }}
          />
          <Typography variant="body1" sx={{ flex: 1, fontWeight: 600 }}>
            Total: ${(item.price * item.amount).toFixed(2)}
          </Typography>
          <IconButton onClick={() => handleRemoveItem(index)} aria-label="Remove">
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))}
      <Button variant="outlined" onClick={handleAddItem} sx={{ alignSelf: 'flex-start' }}>
        Add Item
      </Button>
    </List>
  );
};

const AdminOrderPage = () => {
  const { id } = useParams();
  const { order, isLoadingOrder } = useOrder(id);
  const { products } = useProducts();
  const navigate = useNavigate();

  const defaultValue = useMemo(() => (order && {
    ...order,
    ...deflateObject({
      client: order.client,
      address: order.address
    }, 2)
  }), [order]);

  const handleSubmit = async (values) => {
    await orderService.save(inflateObject(values));
    navigate('/admin/orders');
  };

  const {
    values,
    errors,
    handlers,
    inputs,
    onSubmit
  } = useOrderForm({ default: defaultValue, handleSubmit });

  const statusOptions = useMemo(() => [
    { value: 'pending', label: 'Pending' },
    { value: 'processed', label: 'Processed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ], []);

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
              {id ? 'Edit Order' : 'Add New Order'}
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
              {id ? 'Update the order details below.' : 'Fill in the details for the new order.'}
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h6" component="p" sx={{ color: 'text.medium', mt: 2 }}>
              Contact Information
            </Typography>
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
            </Grid>

            <Typography variant="h6" component="p" sx={{ color: 'text.medium', mt: 2 }}>
              Address
            </Typography>
            <Grid container spacing={2}>
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

            <Typography variant="h6" component="p" sx={{ color: 'text.medium', mt: 2 }}>
              Order Details
            </Typography>
            <OrderItemList
              items={values.items}
              onChange={handlers.items}
              products={products}
            />

            <Autocomplete
              options={statusOptions}
              value={values.status}
              onChange={handlers.status}
              label="Order Status"
              error={errors.status}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminOrderPage;
