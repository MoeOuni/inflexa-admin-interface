import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './providers/theme-provider.tsx';
import { AuthContextProvider } from './contexts/auth-context.tsx';
import { UploadContextProvider } from './contexts/upload-context.tsx';
import { ReactQueryProvider } from './providers/react-query-provider.tsx';
import { PermissionsContextProvider } from './contexts/permissions-context.tsx';

import App from './App.tsx';

import './index.css';
import './lib/i18n';
import { StoreContextProvider } from './contexts/store-context.tsx';
import { Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense
    fallback={
      <div className="flex min-h-[100vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      </div>
    }
  >
    <AuthContextProvider>
      <PermissionsContextProvider>
        <StoreContextProvider>
          <UploadContextProvider>
            <ReactQueryProvider>
              <ThemeProvider defaultTheme="system" storageKey="x-angle-theme">
                <App />
              </ThemeProvider>
            </ReactQueryProvider>
          </UploadContextProvider>
        </StoreContextProvider>
      </PermissionsContextProvider>
    </AuthContextProvider>
  </Suspense>
);
