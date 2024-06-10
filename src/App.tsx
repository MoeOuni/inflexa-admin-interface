import { Toaster } from "@/components/ui/sonner";
import { useContext } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthContext } from "./contexts/auth-context";
import { useTheme } from "./providers/theme-provider";

import { TooltipProvider } from "./components/ui/tooltip";
import { ProtectedRoutes, PublicRoutes } from "./routes";

import frFR from "antd/locale/fr_FR";
import enGB from "antd/locale/en_GB";

import "./App.css";
import { useTranslation } from "react-i18next";

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

function App() {
  const { token } = useContext(AuthContext);
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <ConfigProvider
      locale={i18n.language === "en" ? enGB : frFR}
      theme={{
        token: {
          colorPrimary: "#3C82F6",
          colorInfo: "#3C82F6",
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
