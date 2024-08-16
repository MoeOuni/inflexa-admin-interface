import { Currency } from '@/lib/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { useGetConfigDetails } from '@/api';
import { IStoreConfig } from '@/lib/interfaces';
import { useLocalStorageState } from 'ahooks';
import { toast } from 'sonner';

interface StoreContextType {
  tax: number;
  currency: Currency;
  setTax?: React.Dispatch<React.SetStateAction<number>>;
  setCurrency?: React.Dispatch<React.SetStateAction<Currency>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const StoreContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);

  const config = useGetConfigDetails();

  const [tax, setTax] = useState<number>(19);
  const [currency, setCurrency] = useState<Currency>({
    symbol: 'TND',
    name: 'Tunisian Dinar',
  });

  const [storeConfiguration, setStoreConfiguration] =
    useLocalStorageState<IStoreConfig | null>('x-store-config', {
      defaultValue: null,
    });

  useEffect(() => {
    async function fetchStoreConfig() {
      await config.mutateAsync(user?.associatedWith?._id || '');

      if (config.isSuccess) {
        if (
          JSON.stringify(config.data.data) !==
          JSON.stringify(storeConfiguration)
        ) {
          setStoreConfiguration(config.data.data);
          toast.success('Store configuration loaded successfully');
        }
      }
    }

    if (user?.associatedWith?._id) {
      fetchStoreConfig();
    }
  }, [user]);

  return (
    <StoreContext.Provider value={{ tax, setTax, currency, setCurrency }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreContextProvider');
  }

  return context;
};

export { StoreContextProvider, useStore };
