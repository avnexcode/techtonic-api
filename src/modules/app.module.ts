import { Module } from '@nestjs/common';
import { AppController } from '../features/app/app.controller';
import { MainModule } from './main.module';
import { CategoryModule } from './category.module';
import { BannerModule } from './banner.module';
import { ProductModule } from './product.module';

@Module({
  imports: [MainModule, CategoryModule, BannerModule, ProductModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
