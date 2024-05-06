import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth-context";
import { ConfigProvider } from "antd";

function App() {
  const { token } = useContext(AuthContext)!;

  console.log(token);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#475569",
          colorInfo: "#475569",
        },
      }}
    >
      <Router>
        {/* Routes go here */}
        {token ? <ProtectedRoutes /> : <PublicRoutes />}
      </Router>
    </ConfigProvider>
  );
}

export default App;
