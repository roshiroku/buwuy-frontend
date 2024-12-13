import { createContext, useContext } from 'react';
import productTypeService from '../services/productType.service';
import { useModelContext } from '../hooks/useModelContext';

export const ProductTypeContext = createContext();

export const useProductTypes = () => useContext(ProductTypeContext);

const ProductTypeProvider = ({ children }) => {
  const ctx = useModelContext(productTypeService, 'productType');

  return (
    <ProductTypeContext.Provider value={ctx}>
      {children}
    </ProductTypeContext.Provider>
  );
};

export default ProductTypeProvider;
