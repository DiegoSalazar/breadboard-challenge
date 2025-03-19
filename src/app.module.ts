import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PartsController } from './parts/parts.controller';
import { PartsService } from './parts/parts.service';
import { TtiService } from './supplier-services/tti/tti.service';
import { MyArrowService } from './supplier-services/my-arrow/my-arrow.service';

@Module({
  imports: [HttpModule],
  providers: [PartsService, TtiService, MyArrowService],
  controllers: [PartsController],
})
export class AppModule {}
