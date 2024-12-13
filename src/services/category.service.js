import Service from './Service';

class CategoryService extends Service {
  constructor() {
    super('/categories');
  }
}

export default new CategoryService();
