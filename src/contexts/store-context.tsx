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
  storeConfiguration?: IStoreConfig | null;
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
      config
        .mutateAsync(user?.associatedWith?._id || '')
        .then((response) => {
          if (
            JSON.stringify(response.data) !== JSON.stringify(storeConfiguration)
          ) {
            setStoreConfiguration(response.data);
            toast.success('Store configuration loaded successfully 🛜');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (user?.associatedWith?._id) {
      fetchStoreConfig();
    }
  }, [user]);

  const contextValue = React.useMemo(
    () => ({
      tax,
      setTax,
      currency,
      setCurrency,
      storeConfiguration,
    }),
    [tax, currency, storeConfiguration]
  );

  return (
    <StoreContext.Provider value={contextValue}>
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
