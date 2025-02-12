import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from 'src/models/product.model';
import { QueryParams, QueryResponse } from 'src/models/web.model';
import { CreateUrlService } from 'src/services/create-url.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(
    private prismaService: PrismaService,
    private createUrlService: CreateUrlService,
  ) {}

  async findAll(params: QueryParams): Promise<QueryResponse<Product>> {
    const {
      search = '',
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = params;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        include: {
          category: true,
        },
        take: Number(limit),
        skip,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prismaService.product.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    const lastPage = Math.ceil(total / limit);

    const baseUrl = 'http://localhost:5000/products';
    const nextPageUrl =
      page < lastPage
        ? this.createUrlService.createPageUrl({
            baseUrl: baseUrl,
            pageNum: page + 1,
            limit,
            search,
            sortBy,
            sortOrder,
          })
        : null;

    const prevPageUrl =
      page > 1
        ? this.createUrlService.createPageUrl({
            baseUrl: baseUrl,
            pageNum: page - 1,
            limit,
            search,
            sortBy,
            sortOrder,
          })
        : null;

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        last_page: lastPage,
        next_page_url: nextPageUrl,
        prev_page_url: prevPageUrl,
      },
    };
  }

  async findUniqueId(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    return product;
  }

  async findUniqueSlug(slug: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
    });

    return product;
  }

  async findSimilarSlugs(
    baseSlug: string,
    excludeId: string,
  ): Promise<string[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        AND: [
          {
            slug: {
              startsWith: baseSlug,
            },
          },
          {
            id: {
              not: excludeId,
            },
          },
        ],
      },
      select: {
        slug: true,
      },
    });

    return products.map((product) => product.slug);
  }

  async countUniqueSlug(slug: string): Promise<number> {
    const productCount = await this.prismaService.product.count({
      where: { slug },
    });

    return productCount;
  }

  async countSimilarSlug(slug: string): Promise<number> {
    const productsCount = await this.prismaService.product.count({
      where: {
        slug: {
          contains: slug,
        },
      },
    });

    return productsCount;
  }

  async insert(
    request: CreateProductRequest & { slug: string },
  ): Promise<Product> {
    const product = await this.prismaService.product.create({ data: request });

    return product;
  }

  async update(
    id: string,
    request: UpdateProductRequest & { slug?: string },
  ): Promise<Product> {
    const product = await this.prismaService.product.update({
      where: { id },
      data: request,
    });

    return product;
  }

  async destroy(id: string): Promise<Product> {
    const product = await this.prismaService.product.delete({ where: { id } });

    return product;
  }
}
