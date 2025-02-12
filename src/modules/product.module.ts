import { Module } from '@nestjs/common';
import { ProductController } from 'src/features/product/product.controller';
import { ProductRepository } from 'src/features/product/product.repository';
import { ProductService } from 'src/features/product/product.service';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
