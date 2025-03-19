import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { TtiService } from './tti.service';

describe('TtiService', () => {
  let service: TtiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TtiService],
    }).compile();

    service = module.get<TtiService>(TtiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
