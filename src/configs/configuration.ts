import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT as string, 10) || 5000,
  database: {
    url: process.env.DATABASE_URL,
  },
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
}));
