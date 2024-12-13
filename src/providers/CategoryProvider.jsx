import { createContext, useContext } from 'react';
import categoryService from '../services/category.service';
import { useModelContext } from '../hooks/useModelContext';

export const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

const CategoryProvider = ({ children }) => {
  const ctx = useModelContext(categoryService, {
    single: 'category',
    plural: 'categories',
  }, true);

  return (
    <CategoryContext.Provider value={ctx}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
