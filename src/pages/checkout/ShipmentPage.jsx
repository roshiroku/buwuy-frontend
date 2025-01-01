import { useMemo, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import shipmentSchema, { useShipmentForm } from '../../schema/shipment.schema';
import cartService from '../../services/cart.service';
import * as checkoutService from '../../services/checkout.service';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import { deflateObject, inflateObject } from '../../utils/object.utils';

const ShipmentPage = () => {
  const isComplete = useRef(false);
  const { user } = useAuth();
  const { cart, isLoadingCart, clearCart } = useCart();
  const navigate = useNavigate();

  const defaultValues = useMemo(() => ({
    ...shipmentSchema.empty(),
    ...deflateObject({ contact: user }, 2)
  }), [user]);

  const handleSubmit = async (values) => {
    const data = { ...inflateObject(values), cart: cartService.normalize(cart) };
    const { _id } = await checkoutService.startCheckout(data);
    isComplete.current = true;
    await clearCart();
    navigate(`/checkout/payment/${_id}`);
  };

  const { inputs, onSubmit } = useShipmentForm({ default: defaultValues, handleSubmit });

  if (!isComplete.current && !isLoadingCart && cart?.products.length === 0) {
    return <Navigate to="/404" replace />;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        {inputs['contact.name.first']}
        {inputs['contact.name.last']}
        {inputs['contact.email']}
        {inputs['contact.phone']}
      </div>
      <div>
        {inputs['address.country']}
        {inputs['address.state']}
        {inputs['address.city']}
        {inputs['address.street']}
        {inputs['address.apt']}
        {inputs['address.zip']}
      </div>
      <button type="submit">
        Proceed To Payment
      </button>
    </form>
  );
};

export default ShipmentPage;
