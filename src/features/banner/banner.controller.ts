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
import { Banner } from '@prisma/client';
import { QueryResponse, WebResponse } from 'src/models/web.model';
import { BannerService } from './banner.service';
import { ResponseMessageService } from 'src/services/response-message.service';
import {
  CreateBannerRequest,
  UpdateBannerRequest,
} from 'src/models/banner.model';

@Controller('banners')
export class BannerController {
  constructor(
    private bannerService: BannerService,
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
  ): Promise<WebResponse<QueryResponse<Banner>>> {
    const data = await this.bannerService.getAll({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getAll('banners'),
      data,
    };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getByyId(@Param('id') id: string): Promise<WebResponse<Banner>> {
    const data = await this.bannerService.getById(id);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.getById('banner'),
      data,
    };
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async post(
    @Body() request: CreateBannerRequest,
  ): Promise<WebResponse<Banner>> {
    const data = await this.bannerService.create(request);
    return {
      status: true,
      statusCode: 201,
      message: this.responseMessageService.post('banner'),
      data,
    };
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async put(
    @Param('id') id: string,
    @Body() request: UpdateBannerRequest,
  ): Promise<WebResponse<Banner>> {
    if (
      !(request.title && request.image && request.description && request.badge)
    ) {
      throw new HttpException('Required fields are missing', 404);
    }
    const data = await this.bannerService.update(id, request);
    return {
      status: true,
      statusCode: 200,
      message: this.responseMessageService.put('banner'),
      data,
    };
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() request: UpdateBannerRequest,
  ): Promise<WebResponse<Banner>> {
    const data = await this.bannerService.update(id, request);
    return {
      status: true,
      statusCode: 201,
      message: this.responseMessageService.patch('banner'),
      data,
    };
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<WebResponse<{ id: string }>> {
    const data = await this.bannerService.delete(id);
    return {
      status: true,
      statusCode: 201,
      message: this.responseMessageService.delete('banner'),
      data,
    };
  }
}
