import { Injectable } from '@nestjs/common';
import { CreateClickDatumDto } from './dto/create-click-datum.dto';
import { UpdateClickDatumDto } from './dto/update-click-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClickDatum } from './entities/click-datum.entity';

@Injectable()
export class ClickDataService {
  constructor(
    @InjectRepository(ClickDatum)
    private clickDataRepository: Repository<ClickDatum>,
  ) {}

  create(createClickDatumDto: CreateClickDatumDto) {
    const clickData = this.clickDataRepository.create(createClickDatumDto);
    return this.clickDataRepository.save(clickData);
  }

  findAll(): Promise<ClickDatum[]> {
    return this.clickDataRepository.find({
      relations: ['trackingUrl'],
    });
  }

  findAllTrackUrlClick(id: string): Promise<ClickDatum[]> {
    return this.clickDataRepository.find({
      relations: ['trackingUrl'],
      where: {
        trackingUrlId: id,
      },
    });
  }

  findOne(id: string) {
    return this.clickDataRepository.findOne({
      where: { id },
      relations: [],
    });
  }

  async update(id: string, updateClickDatumDto: UpdateClickDatumDto) {
    const clickData: ClickDatum = await this.clickDataRepository.findOne({
      where: {
        id,
      },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateClickDatumDto);
    const result = { ...clickData, ...value };
    return this.clickDataRepository.save(result);
  }

  async remove(id: string) {
    const deleteClickData = await this.clickDataRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteClickData };
    await this.clickDataRepository.remove(deleteClickData);
    return copy;
  }
}
