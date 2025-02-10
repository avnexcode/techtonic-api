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
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { WebResponse } from 'src/models/web.model';
import { ResponseMessageService } from 'src/services/response-message.service';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'src/models/category.model';

@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private responseMessageService: ResponseMessageService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async get(): Promise<WebResponse<Category[]>> {
    const data = await this.categoryService.getAll();
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getAll('categories'),
      data,
    };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WebResponse<Category>> {
    const data = await this.categoryService.getById(id);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getById('category'),
      data,
    };
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async post(
    @Body() request: CreateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const data = await this.categoryService.create(request);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.post('category'),
      data,
    };
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async put(
    @Param('id') id: string,
    @Body() request: UpdateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const data = await this.categoryService.update(id, request);
    if (!(request.name && request.description)) {
      throw new HttpException(`Required fields are missing`, 404);
    }
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.put('category'),
      data,
    };
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() request: CreateCategoryRequest,
  ): Promise<WebResponse<Category>> {
    const data = await this.categoryService.update(id, request);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.patch('category'),
      data,
    };
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<WebResponse<{ id: string }>> {
    const data = await this.categoryService.delete(id);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.delete('category'),
      data,
    };
  }
}
