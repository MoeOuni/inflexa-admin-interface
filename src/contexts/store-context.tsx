import { Currency } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

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
  const [tax, setTax] = useState<number>(19);
  const [currency, setCurrency] = useState<Currency>({
    symbol: "TND",
    name: "Tunisian Dinar",
  })

  return (
    <StoreContext.Provider value={{ tax, setTax, currency, setCurrency }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }

  return context;
};

export { StoreContextProvider, useStore };
