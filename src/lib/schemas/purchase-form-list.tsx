import { z } from "zod";

export const ProductFomSchema = z.object({
  reference: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  price: z.number().min(0),
  tax: z.number().min(0).max(100),
  quantity: z.number().min(1),
  unit: z.string().min(1).max(255),
});
