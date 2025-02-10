import { Module } from '@nestjs/common';
import { CategoryController } from 'src/features/category/category.controller';
import { CategoryRepository } from 'src/features/category/category.repository';
import { CategoryService } from 'src/features/category/category.service';

@Module({
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
