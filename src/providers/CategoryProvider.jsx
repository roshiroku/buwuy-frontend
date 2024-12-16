import { createContext, useContext } from 'react';
import { useCategories as useModels } from '../services/category.service';

export const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

const CategoryProvider = ({ children }) => {
  const ctx = useModels();
  return (
    <CategoryContext.Provider value={ctx}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
