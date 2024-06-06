import { z } from "zod";
import { ProductFomSchema } from "./schemas";

// Define the type for the context

// Define the type for the user state
export type UserState = {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
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

export interface File {
  originalName: string;
  path: string;
  size: number;
}

export interface SingleFile {
  original?: never;
  uploaded?: File;
}

export interface FileList {
  original: never[];
  uploaded: File[];
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
  purchaseDetails?: ProductForm[]
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
