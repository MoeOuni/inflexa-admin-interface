import React, { lazy } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
// Error Pages
const NotFound = lazy(() => import('@/pages/not-found'));

// Protected Pages
const Home = lazy(() => import('@/pages/admin/home'));
const Logs = lazy(() => import('@/pages/admin/logs'));
const Sales = lazy(() => import('@/pages/admin/sales'));
const Orders = lazy(() => import('@/pages/admin/orders'));
const Settings = lazy(() => import('@/pages/admin/settings'));
const Inventory = lazy(() => import('@/pages/admin/inventory'));
const Analytics = lazy(() => import('@/pages/admin/analytics'));
const Customers = lazy(() => import('@/pages/admin/customers'));
const Suppliers = lazy(() => import('@/pages/admin/suppliers'));
const Purchases = lazy(() => import('@/pages/admin/purchases'));

// Purchase SubRoutes
const PurchaseDetails = lazy(
  () => import('@/components/purchases/purchase-details')
);
const PurchasesList = lazy(
  () => import('@/components/purchases/purchases-list')
);
const SavePurchase = lazy(() => import('@/components/purchases/save-purchase'));

// Settings Menu SubRoutes
const GeneralSettings = lazy(
  () => import('@/components/settings/general-settings')
);
const SecuritySettings = lazy(
  () => import('@/components/settings/security-settings')
);
const RepportsSettings = lazy(
  () => import('@/components/settings/repports-settings')
);
const AdvancedSettings = lazy(
  () => import('@/components/settings/advanced-settings')
);
const CategoriesSettings = lazy(
  () => import('@/components/settings/categories-settings')
);

// Suppliers SubRoutes
const SupplierProfile = lazy(
  () => import('@/components/suppliers/supplier-profile')
);
const SuppliersList = lazy(
  () => import('@/components/suppliers/suppliers-list')
);
const SaveSupplier = lazy(() => import('@/components/suppliers/save-supplier'));

// Customers SubRoutes
const CustomersList = lazy(
  () => import('@/components/customers/customers-list')
);
const CustomerDetails = lazy(
  () => import('@/components/customers/customer-details')
);
const SaveCustomer = lazy(() => import('@/components/customers/save-customer'));

// Products SubRoutes
const SaveProduct = lazy(() => import('@/components/products/save-product'));
const ListProducts = lazy(() => import('@/components/products/list-products')); // Fix the casing here
const ProductDetails = lazy(
  () => import('@/components/products/product-details')
);

// Orders SubRoutes
const OrdersDashboard = lazy(
  () => import('@/components/orders/orders-dashboard')
);
const SaveOrder = lazy(() => import('@/components/orders/save-order'));
const OrderDetails = lazy(() => import('@/components/orders/order-details'));

// Auth Pages
const Login = lazy(() => import('@/pages/auth/login'));
const Register = lazy(() => import('@/pages/auth/register'));
const PublicLayout = lazy(() => import('@/layouts/public-layout'));
const ResetPassword = lazy(() => import('@/pages/auth/reset-password'));
const ForgotPassword = lazy(() => import('@/pages/auth/forgot-password'));

const Spin = () => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

const PublicRoutes = React.memo(() => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[100vh] items-center justify-center">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to={'/login'} />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
});

const ProtectedRoutes = React.memo(() => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<GeneralSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="categories" element={<CategoriesSettings />} />
            <Route path="repports" element={<RepportsSettings />} />
            <Route path="advanced" element={<AdvancedSettings />} />
          </Route>
          <Route path="inventory" element={<Inventory />}>
            <Route index element={<ListProducts />} />
            <Route path="product/:id" element={<SaveProduct />} />
            <Route path="product/:id/details" element={<ProductDetails />} />
          </Route>
          <Route path="orders" element={<Orders />}>
            <Route index element={<OrdersDashboard />} />
            <Route path="save" element={<SaveOrder />} />
            <Route path="save/:id" element={<SaveOrder />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>
          <Route path="sales" element={<Sales />} />
          <Route path="purchases" element={<Purchases />}>
            <Route index element={<PurchasesList />} />
            <Route path=":id" element={<PurchaseDetails />} />
            <Route path="save/:id" element={<SavePurchase />} />
            <Route path="save" element={<SavePurchase />} />
          </Route>
          <Route path="analytics" element={<Analytics />} />
          <Route path="customers" element={<Customers />}>
            <Route index element={<CustomersList />} />
            <Route path=":id" element={<CustomerDetails />} />
            <Route path="save/:id" element={<SaveCustomer />} />
            <Route path="save" element={<SaveCustomer />} />
          </Route>
          <Route path="suppliers" element={<Suppliers />}>
            <Route index element={<SuppliersList />} />
            <Route path=":id" element={<SupplierProfile />} />
            <Route path="save/:id" element={<SaveSupplier />} />
            <Route path="save" element={<SaveSupplier />} />
          </Route>
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
});

export { PublicRoutes, ProtectedRoutes };
