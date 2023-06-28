import { Module } from '@nestjs/common';
import { TrackingUrlService } from './tracking-url.service';
import { TrackingUrlController } from './tracking-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingUrl } from './entities/tracking-url.entity';
import { ClickDatum } from 'src/click-data/entities/click-datum.entity';
import { ClickDataService } from 'src/click-data/click-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingUrl, ClickDatum])],
  controllers: [TrackingUrlController],
  providers: [TrackingUrlService, ClickDataService],
})
export class TrackingUrlModule {}
