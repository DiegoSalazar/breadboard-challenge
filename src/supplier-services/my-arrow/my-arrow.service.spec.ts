import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { MyArrowService } from './my-arrow.service';

describe('MyArrowService', () => {
  let service: MyArrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MyArrowService],
    }).compile();

    service = module.get<MyArrowService>(MyArrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
