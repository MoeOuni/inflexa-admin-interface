import React, { lazy } from "react";
import { Key, LoaderCircle } from "lucide-react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";
import { FloatButton, Tooltip } from "antd";

// Error Pages
const NotFound = lazy(() => import("@/pages/not-found"));

// Protected Pages
const MainLayout = lazy(() => import("@/layouts/main-layout"));
const Home = lazy(() => import("@/pages/admin/home"));

// Auth Pages
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
      <Tooltip title="Preview Login">
        <FloatButton type="primary" icon={<Key size={18}/>} onClick={handleClick} />
      </Tooltip>
    </React.Suspense>
  );
});

const ProtectedRoutes = React.memo(() => {
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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
});

export { PublicRoutes, ProtectedRoutes };
