import { Module } from '@nestjs/common';
import { AppController } from '../features/app/app.controller';
import { MainModule } from './main.module';

@Module({
  imports: [MainModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
