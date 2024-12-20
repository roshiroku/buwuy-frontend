import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

class ProductService extends ModelService {
  constructor() {
    super('/api/products');
  }
}

const productService = new ProductService();

export const { useProduct, useProducts } = useModelService(productService, { name: 'product' });

export default productService;
