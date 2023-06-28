import { Module } from '@nestjs/common';
import { ClickDataService } from './click-data.service';
import { ClickDataController } from './click-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickDatum } from './entities/click-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClickDatum])],
  controllers: [ClickDataController],
  providers: [ClickDataService],
})
export class ClickDataModule {}
