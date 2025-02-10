import { Controller, Get } from '@nestjs/common';
import { WebResponse } from 'src/models/web.model';

@Controller()
export class AppController {
  @Get()
  get(): WebResponse {
    return {
      status: true,
      statusCode: 200,
      message: 'Web API Techtonic 🚀 - version 1.0.0',
    };
  }
}
