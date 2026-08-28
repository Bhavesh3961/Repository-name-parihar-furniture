import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().min(10).max(220),
  description: z.string().trim().min(20).max(1200),
  category: z.string().trim().min(2).max(60),
  material: z.string().trim().max(120),
  finish: z.string().trim().max(120),
  style: z.string().trim().max(120),
  price: z.number().int().min(0).max(100000000).optional(),
  imageUrl: z.string().url().max(2048),
  originalImageUrl: z.string().url().max(2048).optional()
});

export const estimateSchema = z.object({
  packageType: z.enum(["1 BHK Complete Package", "2 BHK Complete Package", "3 BHK Complete Package"]),
  finish: z.enum(["Machine Melamine Gloss / Matte Polish", "Solid Wood Natural Finish", "Premium Velvet + Wood Mix"]),
  devghar: z.boolean(),
  sectional: z.boolean()
});
