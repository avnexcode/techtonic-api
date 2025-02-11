import { Module } from '@nestjs/common';
import { AppController } from '../features/app/app.controller';
import { MainModule } from './main.module';
import { CategoryModule } from './category.module';
import { BannerModule } from './banner.module';

@Module({
  imports: [MainModule, CategoryModule, BannerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
