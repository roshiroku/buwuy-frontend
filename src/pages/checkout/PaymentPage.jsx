import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
  }

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
    <div>
      {isLoading ? 'loading...' : (
        <div>
          <div>
            <b>Payment:</b>
            {toCurrency(order.subtotal)}
          </div>
          <form onSubmit={onSubmit} noValidate>
            {inputs.cc}
            {inputs.expiration}
            {inputs.cvv}
            {inputs.name}
            {inputs.identification}
            <button type="submit">
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
