import { isValidPhoneNumber } from "react-phone-number-input"; 
import { z } from "zod";

export const SupplierFormSchema = z.object({
    supplierCode: z.string().min(1, "Supplier code is required"),
    email: z.string().email("Invalid email address").optional(),
    companyName: z.string().min(1, "Company name is required"),
    taxNumber: z.string().min(1, "Tax Number is required"),
    representative: z.string().optional(),
    phoneNumber: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
    proficPic: z.string().optional(),
    banque: z
      .object({
        _rib: z.string().optional(),
        _iban: z.string().optional(),
        _bic: z.string().optional(),
        _representative: z.string().optional(),
        _agency: z.string().optional(),
      })
      .optional(),
  });