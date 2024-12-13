import Service from './Service';

class ProductTypeService extends Service {
  constructor() {
    super('/product-type');
  }
}

export default new ProductTypeService();
