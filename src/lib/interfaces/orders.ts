export interface Order {
  _id: string;
  orderNumber: string;
  customer: string;
  customerName: string;
  products: {
    product: string;
    productRef: string;
    quantity: number;
    price: number;
  }[];
  totalTax: number;
  totalAmount: number;
  delivery?: {
    deliveryMan?: {
      name?: string;
      phone?: string;
      registrationNumber?: string;
      others?: string;
    }
    status?: 'pending' | 'shipped' | 'delivered';
    date?: Date;
  };
  deliveryPrice?: number;
  discount?: number;
  payment:
    | 'cash'
    | 'credit'
    | 'debit'
    | 'paypal'
    | 'other'
    | 'payment_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'partial';
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
