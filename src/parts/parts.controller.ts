import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { PartsService } from './parts.service';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get('aggregate')
  async getAggregatedParts(@Query('partNumber') partNumber: string) {
    if (!partNumber) {
      throw new HttpException(
        'Part number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.partsService.fetchAndAggregate(partNumber);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
