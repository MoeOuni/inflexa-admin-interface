import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const CustomerFormSchema = z.object({
    name: z.string().min(1, { message: "Customer name is required" }),
    email: z.string().optional(),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    fax: z.string().optional(),
    customerId: z.string().min(1, { message: 'Customer Code is required' }),
    creditLimit: z.number().default(0),
    shippingAddress: z.object({
        street: z.string().min(1, { message: "Street is required" }),
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        postalCode: z.string().min(1, { message: "Postal Code is required" }),
        country: z.string().min(1, { message: "Country is required" })
    }),
    identicalShippingAndBilling: z.boolean().default(false).optional(),
})

export const CustomerFormSchemaDefaultValues = {
    name: '',
    email: '',
    phone: '',
    fax: '',
    customerId: '',
    creditLimit: 0,
    shippingAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    },
    identicalShippingAndBilling: false
}