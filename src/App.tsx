import "./App.css";
import { Toaster } from "sonner";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth-context";
import { useTheme } from "./providers/theme-provider";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { ConfigProvider, theme as antdTheme } from "antd";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter as Router } from "react-router-dom";

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

function App() {
  const { token } = useContext(AuthContext);
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#101827",
          colorInfo: "#101827",
          colorBgContainer: theme === "dark" ? "#030712" : "#ffffff",
          borderRadius: 5,
        },
        algorithm: theme === "light" ? [defaultAlgorithm] : [darkAlgorithm],
      }}
    >
      <TooltipProvider>
        <Toaster />
        <Router>
          {/* Routes go here */}
          {token ? <ProtectedRoutes /> : <PublicRoutes />}
        </Router>
      </TooltipProvider>
    </ConfigProvider>
  );
}

export default App;
