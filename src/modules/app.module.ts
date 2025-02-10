import { Module } from '@nestjs/common';
import { AppController } from '../features/app/app.controller';
import { MainModule } from './main.module';
import { CategoryModule } from './category.module';

@Module({
  imports: [MainModule, CategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
