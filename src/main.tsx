import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './providers/theme-provider.tsx';
import { AuthContextProvider } from './contexts/auth-context.tsx';
import { ReactQueryProvider } from './providers/react-query-provider.tsx';
import { PermissionsContextProvider } from './contexts/permissions-context.tsx';

import App from './App.tsx';

import './index.css';
import './lib/i18n';
import { StoreContextProvider } from './contexts/store-context.tsx';
import { Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';
import dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';

import relativeTime from 'dayjs/plugin/relativeTime'; // ES 2015

dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense
    fallback={
      <div className="flex min-h-[100vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      </div>
    }
  >
    <ReactQueryProvider>
      <AuthContextProvider>
        <PermissionsContextProvider>
          <StoreContextProvider>
            <ThemeProvider defaultTheme="system" storageKey="x-angle-theme">
              <App />
            </ThemeProvider>
          </StoreContextProvider>
        </PermissionsContextProvider>
      </AuthContextProvider>
    </ReactQueryProvider>
  </Suspense>
);
