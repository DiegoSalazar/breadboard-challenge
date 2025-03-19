import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { AggregatedPart } from '../interfaces/aggregated-part.interface';
import { MyArrowService } from '../supplier-services/my-arrow/my-arrow.service';
import { TtiService } from '../supplier-services/tti/tti.service';

const partNumber = '0510210200';
const mockResult = [{ name: 'Mock Part', totalStock: 100 }] as AggregatedPart[];

describe('PartsController', () => {
  let controller: PartsController;
  let service: PartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PartsController],
      providers: [PartsService, MyArrowService, TtiService],
    }).compile();

    controller = module.get<PartsController>(PartsController);
    service = module.get<PartsService>(PartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns parts of a given part number param', async () => {
    const response = await controller.getAggregatedParts(partNumber);
    expect(response).toMatchSnapshot();
  });

  it('warns when no parts found', async () => {
    expect(controller.getAggregatedParts('123')).rejects.toThrow('No data found for part number 123');
  });

  it('should throw a BAD_REQUEST exception if partNumber is not provided', async () => {
    await expect(controller.getAggregatedParts('')).rejects.toThrow(
      new HttpException('Part number is required', HttpStatus.BAD_REQUEST),
    );
  });

  it('should call PartsService.fetchAndAggregate with the correct partNumber', async () => {
    jest.spyOn(service, 'fetchAndAggregate').mockResolvedValue(mockResult as any);

    const result = await controller.getAggregatedParts(partNumber);

    expect(service.fetchAndAggregate).toHaveBeenCalledWith(partNumber);
    expect(result).toEqual(mockResult);
  });

  it('should throw an INTERNAL_SERVER_ERROR exception if the service throws an error', async () => {
    jest
      .spyOn(service, 'fetchAndAggregate')
      .mockRejectedValue(new Error('Service error'));

    await expect(controller.getAggregatedParts(partNumber)).rejects.toThrow(
      new HttpException('Service error', HttpStatus.INTERNAL_SERVER_ERROR),
    );
  });
});
