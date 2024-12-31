import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

class OrderService extends ModelService {
  constructor() {
    super('/api/orders');
  }
}

const orderService = new OrderService();

export const { useOrder, useOrders } = useModelService(orderService, { name: 'order' });

export default orderService;
