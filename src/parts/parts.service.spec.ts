import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { PartsService } from './parts.service';
import { TtiService } from '../supplier-services/tti/tti.service';
import { MyArrowService } from '../supplier-services/my-arrow/my-arrow.service';

describe('PartsService', () => {
  let service: PartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PartsService, TtiService, MyArrowService],
    }).compile();

    service = module.get<PartsService>(PartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns parts of given part number', async () => {
    const partNumber = '0510210200';
    const parts = await service.fetchAndAggregate(partNumber);
    expect(parts).toMatchSnapshot();
  });
});
