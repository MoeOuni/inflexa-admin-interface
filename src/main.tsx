import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/auth-context.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ReactQueryProvider } from "./providers/react-query-provider.tsx";
import { UploadContextProvider } from "./contexts/upload-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <UploadContextProvider>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="x-angle-theme">
          <App />
        </ThemeProvider>
      </ReactQueryProvider>
    </UploadContextProvider>
  </AuthContextProvider>
);
