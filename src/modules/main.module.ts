import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from 'src/filters/error.filter';
import { CreateUrlService } from 'src/services/create-url.service';
import { MetaService } from 'src/services/meta.service';
import { PrismaService } from 'src/services/prisma.service';
import { ResponseMessageService } from 'src/services/response-message.service';
import { SlugService } from 'src/services/slug.service';
import { ValidationService } from 'src/services/validation.service';
import { ConfigurationService } from 'src/services/configuration.service';
import { validate } from 'src/configs/env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [
    ConfigurationService,
    PrismaService,
    ValidationService,
    SlugService,
    ResponseMessageService,
    CreateUrlService,
    MetaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [
    ConfigurationService,
    PrismaService,
    ValidationService,
    SlugService,
    ResponseMessageService,
    CreateUrlService,
    MetaService,
  ],
})
export class MainModule {}
