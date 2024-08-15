import { Address } from './customer';

export interface APICreateInventory {
  reference: string;
  purchaseId: string;
  purchaseReference: string;
  tax: number;
  quantity: number;
  unit: string;
  name: string;
  price: number;
}

export interface APIPurchase {
  _id?: string;
  reference: string;
  supplier: string;
  createdBy?: string;
  broughtAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  totalPrice?: number;
  totalWithoutTax?: number;
  totalTax?: number;
}

export interface APISaveCustomer {
  name: string;
  email?: string;
  phone: string;
  fax?: string;
  customerId: string;
  creditLimit: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  identicalShippingAndBilling?: boolean;
}

export interface APIUpdateProduct {
  reference: string;
  category: {
    categoryId: string;
    categoryName: string;
    subCategoryId?: string;
    subCategoryName?: string;
  };
  name: string;
  description: string;
  stock: {
    initialStock: number;
    currentStock: number;
    soldStock: number;
    damagedStock: number;
    returnedStock: number;
    warehouseLocation?: string;
    unit: string;
  };
  price: {
    listPrice: number;
    discountPrice: number;
    currency: string;
  };
  status: {
    isAvailable: boolean;
    isActive: boolean;
    isFeatured: boolean;
    featureId?: string;
    needsReview: boolean;
  };
  images?: Array<{
    url: string;
    altText: string;
  }>;
}

export interface APILogin {
  email: string;
  password: string;
}

export interface APISaveOrder {
  customerName: string;
  customer: string;
  deliveryPrice: number;
  delivery?: {
    deliveryMan?: {
      name?: string;
      phone?: string;
      registrationNumber?: string;
      others?: string;
    };
    status?: 'pending' | 'shipped' | 'delivered';
    date?: Date;
  };
  products: {
    product: string; // Assuming this is an ObjectId reference, use string for the type
    productRef: string;
    quantity: number;
    price: number;
  }[];
  payment:
    | 'cash'
    | 'credit'
    | 'debit'
    | 'check'
    | 'other'
    | 'payment_on_delivery';
  paymentStatus?: 'unpaid' | 'paid' | 'partial';
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
}
