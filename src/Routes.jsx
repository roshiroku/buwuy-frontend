import { Outlet, Route, Routes } from 'react-router-dom';
import TagProvider from './providers/TagProvider';
import CategoryProvider from './providers/CategoryProvider';
import Authorize from './components/auth/Authorize';
import GuestOnly from './components/auth/GuestOnly';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ShopPage from './pages/shop/ShopPage';
import CategoryPage from './pages/shop/CategoryPage';
import ProductPage from './pages/shop/ProductPage';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPage from './pages/admin/AdminPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminCategoryPage from './pages/admin/AdminCategoryPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductPage from './pages/admin/AdminProductPage';
import AdminVariantsPage from './pages/admin/AdminVariantsPage';
import AdminVariantPage from './pages/admin/AdminVariantPage';
import AdminTagsPage from './pages/admin/AdminTagsPage';

export default () => {
  return (
    <Routes>
      <Route element={(
        <CategoryProvider>
          <TagProvider>
            <Outlet />
          </TagProvider>
        </CategoryProvider>
      )}>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route index element={<HomePage />} />
          <Route element={<GuestOnly><Outlet /></GuestOnly>}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:categorySlug" element={<CategoryPage />} />
          <Route path="shop/:categorySlug/:productSlug" element={<ProductPage />} />
        </Route>
        <Route path="admin" element={<AdminLayout><Outlet /></AdminLayout>}>
          <Route element={<Authorize redirect="/admin/login"><Outlet /></Authorize>}>
            <Route index element={<AdminPage />} />
            <Route path="category" element={<AdminCategoryPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="categories/:id" element={<AdminCategoryPage />} />
            <Route path="product" element={<AdminProductPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/:id" element={<AdminProductPage />} />
            <Route path="products/:id/variant" element={<AdminVariantPage />} />
            <Route path="products/:id/variants" element={<AdminVariantsPage />} />
            <Route path="products/:id/variants/:index" element={<AdminVariantPage />} />
            <Route path="tags" element={<AdminTagsPage />} />
          </Route>
          <Route path="login" element={(
            <GuestOnly redirect={({ role }) => role === 'admin' ? '/admin' : '/'}>
              <AdminLoginPage />
            </GuestOnly>
          )} />
        </Route>
      </Route>
    </Routes >
  );
};
