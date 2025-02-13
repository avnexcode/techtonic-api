import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'src/models/category.model';
import { QueryParams, QueryResponse } from 'src/models/web.model';
import { MetaService } from 'src/services/meta.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(
    private prismaService: PrismaService,
    private metaService: MetaService,
  ) {}
  async findAll(params: QueryParams): Promise<QueryResponse<Category>> {
    const {
      search = '',
      page = 1,
      limit = 10,
      sort = 'created_at',
      order = 'desc',
    } = params;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      this.prismaService.category.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        take: Number(limit),
        skip,
        orderBy: {
          [sort]: order,
        },
      }),
      this.prismaService.category.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    const meta = this.metaService.generateMeta({
      total,
      page,
      limit,
      url: '/categories',
      search,
      sort,
      order,
    });

    return {
      data: categories,
      meta,
    };
  }

  async findUniqueId(id: string): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    return category;
  }

  async findUniqueName(name: string): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      where: { name },
    });

    return category;
  }

  async insert(
    request: CreateCategoryRequest & { slug: string },
  ): Promise<Category> {
    const category = await this.prismaService.category.create({
      data: request,
    });

    return category;
  }

  async update(
    id: string,
    request: UpdateCategoryRequest & { slug: string },
  ): Promise<Category> {
    const category = await this.prismaService.category.update({
      where: { id },
      data: request,
    });

    return category;
  }

  async destroy(id: string): Promise<Category> {
    const category = await this.prismaService.category.delete({
      where: { id },
    });

    return category;
  }
}
