import { HttpException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from '@prisma/client';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'src/models/category.model';
import { ValidationService } from 'src/services/validation.service';
import { CategoryValidation } from 'src/validations/category.validation';
import { SlugService } from 'src/services/slug.service';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private validationService: ValidationService,
    private slugService: SlugService,
  ) {}
  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findUniqueId(id);

    if (!category) {
      throw new HttpException(`Category with id : ${id} not found`, 400);
    }

    return category;
  }

  async create(request: CreateCategoryRequest): Promise<Category> {
    const validatedRequest = this.validationService.validate(
      CategoryValidation.CREATE_CATEGORY,
      request,
    );

    const categoryExists = await this.categoryRepository.findUniqueName(
      validatedRequest.name,
    );

    if (categoryExists) {
      throw new HttpException(
        `Category with name : ${validatedRequest.name} already used.`,
        400,
      );
    }

    const slug = this.slugService.generateSlug(validatedRequest.name);

    const category = await this.categoryRepository.insert({
      ...validatedRequest,
      slug,
    });

    return category;
  }

  async update(id: string, request: UpdateCategoryRequest): Promise<Category> {
    const categoryExists = await this.getById(id);

    const validatedRequest = this.validationService.validate(
      CategoryValidation.UPDATE_CATEGORY,
      request,
    );

    const categoryByNameExists = await this.categoryRepository.findUniqueName(
      validatedRequest.name ?? '',
    );

    if (categoryByNameExists && categoryByNameExists.id !== id) {
      throw new HttpException(
        `Category with name : ${validatedRequest.name} already used.`,
        400,
      );
    }

    let slug: string;

    slug = this.slugService.generateSlug(validatedRequest.name ?? '');

    if (!request.name) {
      slug = categoryExists.slug;
    }

    const category = await this.categoryRepository.update(id, {
      ...validatedRequest,
      slug,
    });

    return category;
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.getById(id);

    await this.categoryRepository.destroy(id);

    return { id };
  }
}
