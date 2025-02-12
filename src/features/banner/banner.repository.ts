import { Injectable } from '@nestjs/common';
import { Banner } from '@prisma/client';
import {
  CreateBannerRequest,
  UpdateBannerRequest,
} from 'src/models/banner.model';
import { QueryParams, QueryResponse } from 'src/models/web.model';
import { MetaService } from 'src/services/meta.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class BannerRepository {
  constructor(
    private prismaService: PrismaService,
    private metaService: MetaService,
  ) {}
  async findAll(params: QueryParams): Promise<QueryResponse<Banner>> {
    const {
      search = '',
      page = 1,
      limit = 10,
      sort = 'created_at',
      order = 'desc',
    } = params;

    const skip = (page - 1) * limit;

    const [banners, total] = await Promise.all([
      this.prismaService.banner.findMany({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip,
        orderBy: {
          [sort]: order,
        },
      }),
      this.prismaService.banner.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    const metaParams = {
      total,
      page,
      limit,
      url: '/banners',
      search,
      sort,
      order,
    };

    const meta = this.metaService.generateMeta(metaParams);

    return {
      data: banners,
      meta,
    };
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
