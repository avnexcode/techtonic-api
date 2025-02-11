import { z } from 'zod';

export const createBannerRequest = z.object({
  title: z.string().min(1).max(150).toLowerCase(),
  image: z.string().min(1),
  description: z.string().min(1).max(255).toLowerCase().optional(),
  badge: z.string().min(1).max(150).toLowerCase().optional(),
});

export const updateBannerRequest = createBannerRequest.partial();

export class BannerValidation {
  static readonly CREATE_BANNER = createBannerRequest;
  static readonly UPDATE_BANNER = updateBannerRequest;
}
