import { Toaster } from '@/components/ui/sonner';
import { useContext, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContext } from './contexts/auth-context';
import { useTheme } from './providers/theme-provider';

import { TooltipProvider } from './components/ui/tooltip';
import { ProtectedRoutes, PublicRoutes } from './routes';

import frFR from 'antd/locale/fr_FR';
import enGB from 'antd/locale/en_GB';

import './App.css';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { WebSocketProvider } from './providers/web-socket-provider';

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

function App() {
  const { token } = useContext(AuthContext);
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <ConfigProvider
      locale={i18n.language === 'en' ? enGB : frFR}
      theme={{
        token: {
          colorPrimary: '#3C82F6',
          colorInfo: '#3C82F6',
          colorBgContainer: theme === 'dark' ? '#030712' : '#ffffff',
          colorBgElevated: theme === 'dark' ? '#0D1525' : '#FAFBFC',
          borderRadius: 5,
        },
        algorithm: theme === 'light' ? [defaultAlgorithm] : [darkAlgorithm],
      }}
    >
      <WebSocketProvider>
        <TooltipProvider>
          <Toaster  position="top-right" />
          <Router>
            {/* Routes go here */}
            {token ? <ProtectedRoutes /> : <PublicRoutes />}
          </Router>
        </TooltipProvider>
      </WebSocketProvider>
    </ConfigProvider>
  );
}

export default App;
