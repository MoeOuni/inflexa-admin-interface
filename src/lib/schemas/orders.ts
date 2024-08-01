import { z } from 'zod';

export const OrderFormSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: 'Customer Name is required and cannot be empty' }),
  customer: z
    .string()
    .min(1, { message: 'Customer is required and cannot be empty' }),
  totalTax: z
    .number({
      message: 'Total Tax is required',
    })
    .min(0, { message: 'Total Tax must be a non-negative number' })
    .default(0),
  totalAmount: z
    .number({ message: 'Total Amount is required' })
    .min(0, { message: 'Total Amount must be a non-negative number' })
    .default(0),
  deliveryPrice: z
    .number({ message: 'Delivery Price is required' })
    .min(0, { message: 'Delivery Price must be a non-negative number' })
    .default(0),
  delivery: z
    .object({
      deliveryMan: z
        .object({
          name: z.string().optional(),
          phone: z.string().optional(),
          registrationNumber: z.string().optional(),
          others: z.string().optional(),
        })
        .optional(),
      status: z
        .enum(['pending', 'shipped', 'delivered'], {
          message:
            "Delivery Status must be one of 'pending', 'shipped', or 'delivered'",
        })
        .optional(),
      date: z.date().optional(),
    })
    .optional(),
  products: z
    .array(
      z.object({
        product: z
          .string()
          .min(1, { message: 'Product name is required and cannot be empty' }),
        productRef: z.string().min(1, {
          message: 'Product reference is required and cannot be empty',
        }),
        quantity: z
          .number({ message: 'Quantity is required' })
          .positive({ message: 'Quantity must be a positive number' }),
        price: z
          .number({ message: 'Price is required' })
          .min(0, { message: 'Price must be a non-negative number' }),
      })
    )
    .min(1, { message: 'At least one product is required' }),
  payment: z.enum(
    ['cash', 'credit', 'debit', 'check', 'other', 'payment_on_delivery'],
    {
      message: 'Payment method is required',
    }
  ),
  paymentStatus: z.enum(['unpaid', 'paid', 'partial'], {
    message: "Payment status must be one of 'unpaid', 'paid', or 'partial'",
  }).optional(),
  status: z.enum(
    ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
    {
      message:
        "Order status must be one of 'pending', 'processed', 'shipped', 'delivered', or 'cancelled'",
    }
  ),
  shippingAddress: z.object({
    street: z.string().min(1, {
      message: 'Shipping Street address is required and cannot be empty',
    }),
    city: z
      .string()
      .min(1, { message: 'Shipping City is required and cannot be empty' }),
    state: z
      .string()
      .min(1, { message: 'Shipping State is required and cannot be empty' }),
    postalCode: z.string().min(1, {
      message: 'Shipping Postal Code is required and cannot be empty',
    }),
    country: z
      .string()
      .min(1, { message: 'Shipping Country is required and cannot be empty' }),
  }),
  billingAddress: z.object({
    street: z.string().min(1, {
      message: 'Billing Street address is required and cannot be empty',
    }),
    city: z
      .string()
      .min(1, { message: 'Billing City is required and cannot be empty' }),
    state: z
      .string()
      .min(1, { message: 'Billing State is required and cannot be empty' }),
    postalCode: z.string().min(1, {
      message: 'Billing Postal Code is required and cannot be empty',
    }),
    country: z
      .string()
      .min(1, { message: 'Billing Country is required and cannot be empty' }),
  }),
  notes: z.string().optional(),
});
