import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'src/models/category.model';
import { QueryResponse, WebResponse } from 'src/models/web.model';
import { ResponseMessageService } from 'src/services/response-message.service';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private responseMessageService: ResponseMessageService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async get(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: 'name' | 'created_at',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<WebResponse<QueryResponse<Category>>> {
    const categories = await this.categoryService.getAll({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getAll('categories'),
      data: categories,
    };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WebResponse<Category>> {
    const categoryById = await this.categoryService.getById(id);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getById('category'),
      data: categoryById,
    };
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async post(
    @Body() request: CreateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const categoryCreated = await this.categoryService.create(request);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.post('category'),
      data: categoryCreated,
    };
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async put(
    @Param('id') id: string,
    @Body() request: UpdateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const categoryUpdated = await this.categoryService.update(id, request);

    if (!(request.name && request.description)) {
      throw new HttpException(`Required fields are missing`, 404);
    }

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.put('category'),
      data: categoryUpdated,
    };
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() request: CreateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const categoryPartialsUpdated = await this.categoryService.update(
      id,
      request,
    );

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.patch('category'),
      data: categoryPartialsUpdated,
    };
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<WebResponse<{ id: string }>> {
    const categoryIdDeleted = await this.categoryService.delete(id);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.delete('category'),
      data: categoryIdDeleted,
    };
  }
}
