import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return {
      status: true,
      statusCode: 200,
      message: 'Web API Techtonic 🚀 - version 1.0.0',
    };
  }
}
