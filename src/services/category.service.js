import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

class CategoryService extends ModelService {
  constructor() {
    super('/api/categories');
  }
}

const categoryService = new CategoryService();

export const { useCategory, useCategories } = useModelService(categoryService, {
  name: ['category', 'categories']
});

export default categoryService;
