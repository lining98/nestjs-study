import { Test, TestingModule } from '@nestjs/testing';
import { UsercurdController } from './usercurd.controller';
import { UsercurdService } from './usercurd.service';

describe('UsercurdController', () => {
  let controller: UsercurdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercurdController],
      providers: [UsercurdService],
    }).compile();

    controller = module.get<UsercurdController>(UsercurdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
