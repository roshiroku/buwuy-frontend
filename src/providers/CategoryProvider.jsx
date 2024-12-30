import { createContext, useCallback, useContext, useMemo } from 'react';
import { useCategories as useModels } from '../services/category.service';

export const CategoryContext = createContext({});

export const useCategories = () => useContext(CategoryContext);

const CategoryProvider = ({ children }) => {
  const ctx = useModels();

  const categoryById = useMemo(() => {
    return Object.fromEntries(ctx.categories.map((cat) => [cat._id, cat]));
  }, [ctx.categories]);

  ctx.getCategory = useCallback((id) => categoryById[id], [categoryById]);

  return (
    <CategoryContext.Provider value={ctx}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
