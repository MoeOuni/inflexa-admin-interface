import { z } from 'zod';

export const OrderFormSchema = z.object({
    customer: z.string().min(1, { message: "Customer is required" }),
    totalTax: z.number().default(0),
    totaltotalAmount: z.number().default(0),
    deliveryPrice: z.number().default(0),
    delivery: z.object({
        deliveryMan: z.object({
            name: z.string().optional(),
            phone: z.string().optional(),
            registrationNumber: z.string().optional(),
            others: z.string().optional(),
        }).optional(),
        status: z.enum(['pending', 'shipped', 'delivered']).optional(),
        date: z.date().optional(),
    }).optional(),
    products: z.array(
        z.object({
            product: z.string().min(1, { message: "Product is required" }),
            productRef: z.string().min(1, { message: "Product Reference is required" }),
            quantity: z.number().min(1, { message: "Quantity is required" }),
            price: z.number().min(1, { message: "Price is required" }),
        })
    ),
    payment: z.enum(['cash', 'credit', 'debit', 'paypal', 'other', 'payment_on_delivery']),
    paymentStatus: z.enum(['pending', 'paid', 'partial']),
    status: z.enum(['pending', 'processed', 'shipped', 'delivered', 'cancelled']),
    shippingAddress: z.object({
        street: z.string().min(1, { message: "Street is required" }),
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        postalCode: z.string().min(1, { message: "Postal Code is required" }),
        country: z.string().min(1, { message: "Country is required" })
    }),
    billingAddress: z.object({
        street: z.string().min(1, { message: "Street is required" }),
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        postalCode: z.string().min(1, { message: "Postal Code is required" }),
        country: z.string().min(1, { message: "Country is required" })
    }),
    notes: z.string().optional(),
});