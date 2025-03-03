import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ThemeProvider from './providers/ThemeProvider';
import CategoryProvider from './providers/CategoryProvider';
import TagProvider from './providers/TagProvider';
import CartProvider from './providers/CartProvider';
import Authenticate from './components/auth/Authenticate';
import Authorize from './components/auth/Authorize';
import GuestOnly from './components/auth/GuestOnly';
import Layout from './components/layout/Layout';
import Container from './components/layout/Container';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ContactSuccessPage from './pages/ContactSuccessPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ShopPage from './pages/shop/ShopPage';
import SearchPage from './pages/shop/SearchPage';
import BestSellersPage from './pages/shop/BestSellersPage';
import CategoryPage from './pages/shop/CategoryPage';
import ProductPage from './pages/shop/ProductPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ShipmentPage from './pages/checkout/ShipmentPage';
import PaymentPage from './pages/checkout/PaymentPage';
import CheckoutSuccessPage from './pages/checkout/CheckoutSuccessPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminCategoryPage from './pages/admin/AdminCategoryPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductPage from './pages/admin/AdminProductPage';
import AdminTagsPage from './pages/admin/AdminTagsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminUserPage from './pages/admin/AdminUserPage';
import NotFoundPage from './pages/NotFoundPage';

export default () => {
  return (
    <Routes>
      <Route element={(
        <ThemeProvider>
          <CategoryProvider>
            <TagProvider>
              <Outlet />
            </TagProvider>
          </CategoryProvider>
        </ThemeProvider>
      )}>
        <Route element={(
          <CartProvider>
            <Layout>
              <Outlet />
            </Layout>
          </CartProvider>
        )}>
          <Route index element={<HomePage />} />
          <Route element={<Container><Outlet /></Container>}>
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contact/success" element={<ContactSuccessPage />} />
            <Route element={<GuestOnly><Outlet /></GuestOnly>}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/search" element={<SearchPage />} />
            <Route path="shop/best-sellers" element={<BestSellersPage />} />
            <Route path="shop/:categorySlug" element={<CategoryPage />} />
            <Route path="shop/:categorySlug/:productSlug" element={<ProductPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/shipment" element={<ShipmentPage />} />
            <Route path="checkout/payment/:id" element={<PaymentPage />} />
            <Route path="checkout/success/:id" element={<CheckoutSuccessPage />} />
            <Route element={<Authenticate><Outlet /></Authenticate>}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
            <Route path="orders/:id" element={<OrderPage />} />
            <Route path="404" element={<NotFoundPage />} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout><Outlet /></AdminLayout>}>
          <Route element={<Authorize roles={['admin', 'moderator']} redirect="/admin/login"><Outlet /></Authorize>}>
            <Route index element={<AdminDashboard />} />
            <Route path="category" element={<AdminCategoryPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="categories/:id" element={<AdminCategoryPage />} />
            <Route path="order" element={<AdminOrderPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="orders/:id" element={<AdminOrderPage />} />
            <Route path="product" element={<AdminProductPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/:id" element={<AdminProductPage />} />
            <Route path="tags" element={<AdminTagsPage />} />
            <Route element={<Authorize redirect="/admin/login"><Outlet /></Authorize>}>
              <Route path="user" element={<AdminUserPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/:id" element={<AdminUserPage />} />
            </Route>
          </Route>
          <Route path="login" element={(
            <GuestOnly redirect={({ role }) => role === 'admin' ? '/admin' : '/'}>
              <AdminLoginPage />
            </GuestOnly>
          )} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes >
  );
};
