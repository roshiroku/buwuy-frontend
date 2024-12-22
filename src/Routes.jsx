import { Outlet, Route, Routes } from 'react-router-dom';
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

export default () => {
  return (
    <Routes>
      <Route element={<CategoryProvider><Outlet /></CategoryProvider>}>
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
            <Route path="categories" element={<AdminCategoriesPage />} />
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
