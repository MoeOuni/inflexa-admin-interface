import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth-context";
import { ConfigProvider } from "antd";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const { token } = useContext(AuthContext)!;

  console.log(token);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F97315",
          colorInfo: "#F97315",
        },
      }}
    >
      <TooltipProvider>
        <Router>
          {/* Routes go here */}
          {token ? <ProtectedRoutes /> : <PublicRoutes />}
        </Router>
      </TooltipProvider>
    </ConfigProvider>
  );
}

export default App;
