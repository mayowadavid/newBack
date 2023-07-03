import { Injectable } from '@nestjs/common';
import { CreateInformationItemDto } from './dto/create-information-item.dto';
import { UpdateInformationItemDto } from './dto/update-information-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformationItem } from './entities/information-item.entity';

@Injectable()
export class InformationItemService {
  constructor(
    @InjectRepository(InformationItem)
    private InformationItemRepository: Repository<InformationItem>,
  ) {}
  create(CreateInformationItemDto: CreateInformationItemDto, user) {
    const InformationItem = this.InformationItemRepository.create(
      CreateInformationItemDto,
    );
    InformationItem.user = user;
    return this.InformationItemRepository.save(InformationItem);
  }

  findAll(): Promise<InformationItem[]> {
    return this.InformationItemRepository.find({});
  }

  findAllInformationItemByProject(user, projectId): Promise<InformationItem[]> {
    return this.InformationItemRepository.find({
      where: { user, projectId },
      relations: ['categoryItem'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string, user) {
    return this.InformationItemRepository.findOne({
      where: { id, user },
      relations: ['categoryItem', 'user'],
    });
  }

  async update(
    id: string,
    updateInformationItemDto: UpdateInformationItemDto,
    user,
  ): Promise<InformationItem> {
    const InformationItem: InformationItem =
      await this.InformationItemRepository.findOne({
        where: {
          id,
          user,
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
    const value = clean(updateInformationItemDto);
    const result = { ...InformationItem, ...value };
    return this.InformationItemRepository.save(result);
  }

  async remove(id: string) {
    const deleteInformationItem = await this.InformationItemRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteInformationItem };
    copy.categoryItem = null;
    copy.project = null;
    copy.user = null;
    const result = await this.InformationItemRepository.save(
      deleteInformationItem,
    );
    await this.InformationItemRepository.remove(deleteInformationItem);
    return copy;
  }
}
