import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1).max(150).toLowerCase(),
  description: z.string().min(1).max(255).toLowerCase().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export class CategoryValidation {
  static readonly CREATE_CATEGORY = createCategorySchema;
  static readonly UPDATE_CATEGORY = updateCategorySchema;
}
