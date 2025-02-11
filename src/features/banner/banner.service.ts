import { BannerRepository } from 'src/features/banner/banner.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/services/validation.service';
import { Banner } from '@prisma/client';
import {
  CreateBannerRequest,
  UpdateBannerRequest,
} from 'src/models/banner.model';
import { BannerValidation } from 'src/validations/banner.validtion';

@Injectable()
export class BannerService {
  constructor(
    private bannerRepository: BannerRepository,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<Banner[]> {
    const banners = await this.bannerRepository.findAll();
    return banners;
  }

  async getById(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findUniqueId(id);

    if (!banner) {
      throw new HttpException(`Banner with id : ${id} not found`, 404);
    }

    return banner;
  }

  async create(request: CreateBannerRequest): Promise<Banner> {
    const validatedRequest = this.validationService.validate(
      BannerValidation.CREATE_BANNER,
      request,
    );

    const banner = await this.bannerRepository.insert(validatedRequest);

    return banner;
  }

  async update(id: string, request: UpdateBannerRequest): Promise<Banner> {
    const validatedRequest = this.validationService.validate(
      BannerValidation.UPDATE_BANNER,
      request,
    );

    const banner = await this.bannerRepository.update(id, validatedRequest);

    return banner;
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.getById(id);

    await this.bannerRepository.destroy(id);

    return { id };
  }
}
