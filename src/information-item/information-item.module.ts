import { Module } from '@nestjs/common';
import { InformationItemService } from './information-item.service';
import { InformationItemController } from './information-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationItem } from './entities/information-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InformationItem])],
  controllers: [InformationItemController],
  providers: [InformationItemService],
})
export class InformationItemModule {}
