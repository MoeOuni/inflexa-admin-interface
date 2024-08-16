export interface IGeneralStore {
  taxNumber: string;
  taxValue?: number;
  storeName: string;
  storeLogo?: string;
  storeDescription?: string;
  contactEmail?: string;
  phoneNumber?: string;
  extraPhoneNumber?: string;
  fax?: string;
  bankAccount?: {
    rib?: string;
    bankName?: string;
    accountNumber?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socialMediaLinks?: {
    facebook?: string;
    x?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  currency?: string;
}

export interface IRepportsConfig {
  sales?: boolean;
  purchases?: boolean;
  products?: boolean;
  customers?: boolean;
  suppliers?: boolean;
  employees?: boolean;
  taxes?: boolean;
  payments?: boolean;
}

export interface IAlertsConfig {
  lowStock?: boolean;
  newSale?: boolean;
  newPurchase?: boolean;
  newCustomer?: boolean;
  newSupplier?: boolean;
  newEmployee?: boolean;
  newTax?: boolean;
  newPayment?: boolean;
}

export interface IStoreConfig extends IGeneralStore {
  _id: string;
  reports: IRepportsConfig;
  alerts: IAlertsConfig;
  meta?: any;
}
