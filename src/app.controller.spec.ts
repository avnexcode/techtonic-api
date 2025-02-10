import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './features/app/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Web API response', () => {
      const expectedResponse = {
        status: true,
        statusCode: 200,
        message: 'Web API Techtonic 🚀 - version 1.0.0',
      };
      expect(appController.get()).toEqual(expectedResponse);
    });
  });
});
