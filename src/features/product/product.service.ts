import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ValidationService } from 'src/services/validation.service';
import { Product } from '@prisma/client';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from 'src/models/product.model';
import { ProductValidation } from 'src/validations/product.validation';
import { SlugService } from 'src/services/slug.service';
import { QueryParams, QueryResponse } from 'src/models/web.model';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private validationService: ValidationService,
    private slugService: SlugService,
  ) {}

  async getAll(params: QueryParams): Promise<QueryResponse<Product>> {
    const products = await this.productRepository.findAll(params);

    return products;
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findUniqueId(id);

    if (!product) {
      throw new HttpException(`Product with id : ${id} not found`, 404);
    }

    return product;
  }

  async create(request: CreateProductRequest): Promise<Product> {
    const validatedRequest = this.validationService.validate(
      ProductValidation.CREATE_PRODUCT,
      request,
    );

    let slug = this.slugService.generateSlug(validatedRequest.name);

    const slugExists = await this.productRepository.countSimilarSlug(slug);

    const slugIndex = slugExists + 1;

    if (slugExists !== 0) {
      slug = slug + `-${slugIndex}`;
    }

    const product = await this.productRepository.insert({
      ...validatedRequest,
      slug,
    });

    return product;
  }

  async update(id: string, request: UpdateProductRequest): Promise<Product> {
    const validatedRequest = this.validationService.validate(
      ProductValidation.UPDATE_PRODUCT,
      request,
    );

    let product: Product;

    if (!validatedRequest.name) {
      product = await this.productRepository.update(id, validatedRequest);
    } else {
      const slug = await this.slugService.generateUniqueSlug(
        validatedRequest.name,
        this.productRepository,
        id,
      );

      product = await this.productRepository.update(id, {
        ...validatedRequest,
        slug,
      });
    }

    return product;
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.getById(id);

    await this.productRepository.destroy(id);

    return { id };
  }
}
