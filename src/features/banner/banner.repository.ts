import { Injectable } from '@nestjs/common';
import { Banner } from '@prisma/client';
import {
  CreateBannerRequest,
  UpdateBannerRequest,
} from 'src/models/banner.model';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class BannerRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll(): Promise<Banner[]> {
    const banners = await this.prismaService.banner.findMany();

    return banners;
  }

  async findUniqueId(id: string): Promise<Banner | null> {
    const banner = await this.prismaService.banner.findUnique({
      where: { id },
    });

    return banner;
  }

  async insert(request: CreateBannerRequest): Promise<Banner> {
    const banner = await this.prismaService.banner.create({
      data: request,
    });

    return banner;
  }

  async update(id: string, request: UpdateBannerRequest): Promise<Banner> {
    const banner = await this.prismaService.banner.update({
      where: { id },
      data: request,
    });

    return banner;
  }

  async destroy(id: string): Promise<Banner> {
    const banner = await this.prismaService.banner.delete({ where: { id } });

    return banner;
  }
}
