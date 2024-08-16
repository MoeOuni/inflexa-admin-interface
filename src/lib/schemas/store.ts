import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const StoreFormSchema = z.object({
  taxNumber: z.string().min(1, 'Tax Number is required'),
  taxValue: z.number().optional(),
  storeName: z.string().min(1, 'Store Name is required'),
  storeLogo: z.string().optional(),
  storeDescription: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .optional(),
  extraPhoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .optional(),
  fax: z.string().optional(),
  bankAccount: z
    .object({
      rib: z.string().optional(),
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
    })
    .optional(),
  address: z
    .object({
      street: z.string().min(1, { message: 'Street is required' }),
      city: z.string().min(1, { message: 'City is required' }),
      state: z.string().min(1, { message: 'State is required' }),
      postalCode: z.string().min(1, { message: 'Postal Code is required' }),
      country: z.string().min(1, { message: 'Country is required' }),
    })
    .optional(),
  socialMediaLinks: z
    .object({
      facebook: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(?.)?]/,
          'Invalid Facebook URL'
        )
        .optional(),
      x: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?x.com\/[a-zA-Z0-9_]{1,15}$/,
          'Invalid X (formerly Twitter) URL'
        )
        .optional(),
      instagram: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9._]+$/,
          'Invalid Instagram URL'
        )
        .optional(),
      linkedin: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?linkedin.com\/in\/[a-zA-Z0-9-]+$/,
          'Invalid LinkedIn URL'
        )
        .optional(),
      tiktok: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?tiktok.com\/@[a-zA-Z0-9._]+$/,
          'Invalid TikTok URL'
        )
        .optional(),
      youtube: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?youtube.com\/(channel\/UC[a-zA-Z0-9_-]+|c\/[a-zA-Z0-9_-]+)$/,
          'Invalid YouTube URL'
        )
        .optional(),
    })
    .optional(),
  currency: z.string().optional(),
  paymentsGateways: z.object({
    paypal: z.boolean().optional(),
    stripe: z.boolean().optional(),
    flouci: z.boolean().optional(),
  }),
  reports: z.object({
    sales: z.boolean().optional(),
    purchases: z.boolean().optional(),
    products: z.boolean().optional(),
    customers: z.boolean().optional(),
    suppliers: z.boolean().optional(),
    employees: z.boolean().optional(),
    taxes: z.boolean().optional(),
    payments: z.boolean().optional(),
  }),
  alerts: z.object({
    lowStock: z.boolean().optional(),
    newSale: z.boolean().optional(),
    newPurchase: z.boolean().optional(),
    newCustomer: z.boolean().optional(),
    newSupplier: z.boolean().optional(),
    newEmployee: z.boolean().optional(),
    newTax: z.boolean().optional(),
    newPayment: z.boolean().optional(),
  }),
  meta: z.any().optional(),
});

export const GeneralStoreFormSchema = z.object({
  taxNumber: z.string().min(1, 'Tax Number is required'),
  taxValue: z.number().optional(),
  storeName: z.string().min(1, 'Store Name is required'),
  storeLogo: z.string().optional(),
  storeDescription: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .optional(),
  extraPhoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .optional(),
  fax: z.string().optional(),
  bankAccount: z
    .object({
      rib: z.string().optional(),
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
    })
    .optional(),
  address: z
    .object({
      street: z.string().min(1, { message: 'Street is required' }),
      city: z.string().min(1, { message: 'City is required' }),
      state: z.string().min(1, { message: 'State is required' }),
      postalCode: z.string().min(1, { message: 'Postal Code is required' }),
      country: z.string().min(1, { message: 'Country is required' }),
    })
    .optional(),
  socialMediaLinks: z
    .object({
      facebook: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(?.)?]/,
          'Invalid Facebook URL'
        )
        .optional(),
      x: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?x.com\/[a-zA-Z0-9_]{1,15}$/,
          'Invalid X (formerly Twitter) URL'
        )
        .optional(),
      instagram: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9._]+$/,
          'Invalid Instagram URL'
        )
        .optional(),
      linkedin: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?linkedin.com\/in\/[a-zA-Z0-9-]+$/,
          'Invalid LinkedIn URL'
        )
        .optional(),
      tiktok: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?tiktok.com\/@[a-zA-Z0-9._]+$/,
          'Invalid TikTok URL'
        )
        .optional(),
      youtube: z
        .string()
        .regex(
          /^(https?:\/\/)?(www\.)?youtube.com\/@[a-zA-Z0-9._]+$/,
          'Invalid TikTok URL'
        )
        .optional(),
    })
    .optional(),
  currency: z.string().optional(),
});

export const GeneralStoreFormDefaultValues = {
  taxNumber: '',
  taxValue: 0,
  storeName: '',
  storeLogo: '',
  storeDescription: '',
  contactEmail: '',
  phoneNumber: '',
  extraPhoneNumber: '',
  fax: '',
  bankAccount: {
    rib: '',
    bankName: '',
    accountNumber: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  socialMediaLinks: {
    facebook: '',
    x: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
  },
  currency: '',
};
