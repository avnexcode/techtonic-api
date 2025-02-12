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
import { ProductService } from './product.service';
import { QueryResponse, WebResponse } from 'src/models/web.model';
import { Product } from '@prisma/client';
import { ResponseMessageService } from 'src/services/response-message.service';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from 'src/models/product.model';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private responseMessageService: ResponseMessageService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async get(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: 'name' | 'created_at' | 'price',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<WebResponse<QueryResponse<Product>>> {
    const products = await this.productService.getAll({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getAll('products'),
      data: products,
    };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WebResponse<Product>> {
    const productById = await this.productService.getById(id);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getById('product'),
      data: productById,
    };
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async post(
    @Body() request: CreateProductRequest,
  ): Promise<WebResponse<Product>> {
    const productCreated = await this.productService.create(request);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.post('product'),
      data: productCreated,
    };
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async put(
    @Param('id') id: string,
    @Body() request: UpdateProductRequest,
  ): Promise<WebResponse<Product>> {
    if (!(request.name && request.description)) {
      throw new HttpException(`Required fields are missing`, 404);
    }

    const productUpdated = await this.productService.update(id, request);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.put('product'),
      data: productUpdated,
    };
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() request: CreateProductRequest,
  ): Promise<WebResponse<Product>> {
    const productPartialsUpdated = await this.productService.update(
      id,
      request,
    );

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.patch('product'),
      data: productPartialsUpdated,
    };
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<WebResponse<{ id: string }>> {
    const productIdDeleted = await this.productService.delete(id);

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.delete('product'),
      data: productIdDeleted,
    };
  }
}
