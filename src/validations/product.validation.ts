import { z } from 'zod';

export const createProductRequest = z.object({
  name: z.string().min(1).max(150).toLowerCase(),
  price: z.string().min(1).max(50),
  image: z.string().url(),
  discount: z.number().int().optional(),
  description: z.string().min(1).toLowerCase().optional(),
  tokopedia_link: z.string().url().optional(),
  shopee_link: z.string().url().optional(),
  tiktok_link: z.string().url().optional(),
  category_id: z.string(),
});

export const updateProductRequest = createProductRequest.partial();

export class ProductValidation {
  static readonly CREATE_PRODUCT = createProductRequest;
  static readonly UPDATE_PRODUCT = updateProductRequest;
}
