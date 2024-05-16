import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/auth-context.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ReactQueryProvider } from "./providers/react-query-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ReactQueryProvider>
  </AuthContextProvider>
);
