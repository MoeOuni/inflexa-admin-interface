import React, { lazy } from "react";
import { Key, LoaderCircle, LogOut } from "lucide-react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";
import { FloatButton, Tooltip } from "antd";

// Error Pages
const NotFound = lazy(() => import("@/pages/not-found"));

// Protected Pages
const Home = lazy(() => import("@/pages/admin/home"));
const Logs = lazy(() => import("@/pages/admin/logs"));
const Sales = lazy(() => import("@/pages/admin/sales"));
const Orders = lazy(() => import("@/pages/admin/orders"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const MainLayout = lazy(() => import("@/layouts/main-layout"));
const Inventory = lazy(() => import("@/pages/admin/inventory"));
const Analytics = lazy(() => import("@/pages/admin/analytics"));
const Customers = lazy(() => import("@/pages/admin/customers"));
const Suppliers = lazy(() => import("@/pages/admin/suppliers"));
const Purchases = lazy(() => import("@/pages/admin/purchases"));

// Menu SubRoutes
const GeneralSettings = lazy(() => import("@/components/settings/general-settings"));
const SecuritySettings = lazy(() => import("@/components/settings/security-settings"));
const RepportsSettings = lazy(() => import("@/components/settings/repports-settings"));
const AdvancedSettings = lazy(() => import("@/components/settings/advanced-settings"));
const CategoriesSettings = lazy(() => import("@/components/settings/categories-settings"));

const SupplierProfile = lazy(() => import("@/components/suppliers/supplier-profile"));
const SuppliersList = lazy(() => import("@/components/suppliers/suppliers-list"));
const SaveSupplier = lazy(() => import("@/components/suppliers/save-supplier"));

// Auth Pages
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const PublicLayout = lazy(() => import("@/layouts/public-layout"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));

const Spin = () => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

const PublicRoutes = React.memo(() => {
  const { setDummyAuth } = React.useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setDummyAuth();
    navigate("/");
  };

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
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Route>
      </Routes>
      <Tooltip title="Preview Login">
        <FloatButton
          icon={<Key size={18} />}
          onClick={handleClick}
        />
      </Tooltip>
    </React.Suspense>
  );
});

const ProtectedRoutes = React.memo(() => {
  const { clearDummyAuth } = React.useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    clearDummyAuth();
    navigate("/login");
  };

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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />}>
            <Route index element={<GeneralSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="categories" element={<CategoriesSettings />} />
            <Route path="repports" element={<RepportsSettings />} />
            <Route path="advanced" element={<AdvancedSettings />} />
          </Route>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />}>
            <Route index element={<SuppliersList />} />
            <Route path='/suppliers/:id' element={<SupplierProfile />} />
            <Route path='/suppliers/save/:id' element={<SaveSupplier />} />
            <Route path='/suppliers/save' element={<SaveSupplier />} />
          </Route>
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Tooltip title="Logout">
        <FloatButton
          icon={<LogOut size={18} />}
          onClick={handleClick}
        />
      </Tooltip>
    </React.Suspense>
  );
});

export { PublicRoutes, ProtectedRoutes };
