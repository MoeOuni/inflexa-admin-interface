import { z } from 'zod';
import { ProductFomSchema } from './schemas';

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
}

// Define the type for the context
export type AuthContextType = {
  token: string | undefined;
  user: UserState | undefined;
  setToken: (token: string | undefined) => void;
  setUser: (user: UserState | undefined) => void;
};

export type PermissionContextType = {
  permissions: Permission[] | undefined;
  setPermissions: (permissions: Permission[] | undefined) => void;
};

// Define the type for the user state
export type UserState = {
  _id?: string;
  email: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    bio?: string;
    avatarUrl?: string;
  };
  settings?: {
    notifications?: {
      push?: boolean;
      sms?: boolean;
      email?: boolean;
    };
    privacy?: {
      profileVisibility?: string;
    };
  };
  role?: string;
  notifications?: {
    playerId?: string;
    segmentedId?: string;
  };
  associatedWith: {
    _id: string;
    contactEmail?: string;
    phoneNumber?: string;
    storeName?: string;
    storeLogo?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  archviedAt?: Date;
};

export interface SubCategory {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
}

export interface Category {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  subCategories?: SubCategory[];
}

export interface Permission {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface Role {
  _id?: string;
  name: string;
  description?: string;
  permissions?: Permission[] | string[];
  createdAt?: Date;
}

export interface Banque {
  _id?: string;
  _rib?: string;
  _iban?: string;
  _bic?: string;
  _representative?: string;
  _agency?: string;
}

export interface Supplier {
  _id?: string;
  supplierCode: string;
  email?: string;
  companyName: string;
  taxNumber: string;
  representative?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  description?: string;
  banque?: Banque;
  profilePic?: string;
  logo?: string;
}

export type ProductForm = z.infer<typeof ProductFomSchema>;

export interface Purchase {
  _id?: string;
  reference: string;
  supplierId: string;
  supplierLabel?: string;
  purchaseDetails?: ProductForm[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  total: number;
}

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  category?: string;
  subCategory?: string;
  purchasePrice: number;
  price?: number;
  tax: number;
  quantity: number;
  unity: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Currency {
  symbol: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;
