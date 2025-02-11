import { Module } from '@nestjs/common';
import { BannerController } from 'src/features/banner/banner.controller';
import { BannerRepository } from 'src/features/banner/banner.repository';
import { BannerService } from 'src/features/banner/banner.service';

@Module({
  providers: [BannerService, BannerRepository],
  controllers: [BannerController],
})
export class BannerModule {}
