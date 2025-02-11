import { z } from 'zod';

export const createCategoryRequest = z.object({
  name: z.string().min(1).max(150).toLowerCase(),
  description: z.string().min(1).max(255).toLowerCase().optional(),
});

export const updateCategoryRequest = createCategoryRequest.partial();

export class CategoryValidation {
  static readonly CREATE_CATEGORY = createCategoryRequest;
  static readonly UPDATE_CATEGORY = updateCategoryRequest;
}
