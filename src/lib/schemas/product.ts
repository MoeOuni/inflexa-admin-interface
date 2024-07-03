import { z } from 'zod';

export const ProductSchema = z.object({
  reference: z.string().min(1, { message: 'Reference is required' }),
  category: z.object({
    categoryId: z.string().optional(),
    categoryName: z.string().optional(),
    subCategoryId: z.string().optional(),
    subCategoryName: z.string().optional(),
  }),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  stock: z.object({
    initialStock: z.number().optional(),
    currentStock: z.number().optional(),
    soldStock: z.number().optional(),
    damagedStock: z.number().optional(),
    returnedStock: z.number().optional(),
    warehouseLocation: z.string().optional(),
    unit: z.string().optional(),
  }).optional(),
  variants: z.array(
    z.object({
      title: z.string().optional(),
      reference: z.string().optional(),
      otherAttributes: z.string().optional(),
      stock: z.object({
        initialStock: z.number().optional(),
        currentStock: z.number().optional(),
        soldStock: z.number().optional(),
        damagedStock: z.number().optional(),
        returnedStock: z.number().optional(),
      }).optional(),
      price: z.object({
        listPrice: z.number().optional(),
        discountPrice: z.number().optional(),
        currency: z.string().optional(),
      }).optional(),
      images: z.array(
        z.object({
          url: z.string().optional(),
          altText: z.string().optional(),
        })
      ).optional(),
    })
  ).optional(),
  price: z.object({
    listPrice: z.number().optional(),
    discountPrice: z.number().optional(),
    currency: z.string().optional(),
  }).optional(),
  images: z.array(
    z.object({
      url: z.string().optional(),
      altText: z.string().optional(),
    })
  ).optional(),
  status: z.object({
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    featureId: z.string().optional(),
  }).optional(),
  searchAttributes: z.array(z.string().optional()).optional(),
}).strict();
