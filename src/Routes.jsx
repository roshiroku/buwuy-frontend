import { Outlet, Route, Routes } from 'react-router-dom';
import CategoryProvider from './providers/CategoryProvider';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/ShopPage';
import CategoryPage from './pages/shop/CategoryPage';
import ProductPage from './pages/shop/ProductPage';

export default () => {
  return (
    <Routes>
      <Route index element={() => (
        <CategoryProvider>
          <Layout>
            <Outlet />
          </Layout>
        </CategoryProvider>
      )}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:categorySlug" element={<CategoryPage />} />
        <Route path="shop/:categorySlug/:productSlug" element={<ProductPage />} />
      </Route>
    </Routes >
  );
};
