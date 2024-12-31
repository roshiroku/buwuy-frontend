import { Navigate, useParams } from 'react-router-dom';
import { useOrder } from '../../services/order.service';

const CheckoutSuccessPage = () => {
  const { id } = useParams();
  const { order, isLoadingOrder } = useOrder(id);

  if (!(isLoadingOrder || order)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      {isLoadingOrder ? 'loading...' : (
        <h4>Order Complete!</h4>
      )}
    </div>
  );
};

export default CheckoutSuccessPage;
