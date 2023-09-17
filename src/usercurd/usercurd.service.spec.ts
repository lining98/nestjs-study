import { Test, TestingModule } from '@nestjs/testing';
import { UsercurdService } from './usercurd.service';

describe('UsercurdService', () => {
  let service: UsercurdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercurdService],
    }).compile();

    service = module.get<UsercurdService>(UsercurdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
