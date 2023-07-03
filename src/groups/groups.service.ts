import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  create(createGroupDto: CreateGroupDto, user) {
    const group = this.groupRepository.create(createGroupDto);
    group.user = user;
    return this.groupRepository.save(group);
  }

  findAll(): Promise<Group[]> {
    return this.groupRepository.find({});
  }

  findAllUserGroup(user, projectId): Promise<Group[]> {
    return this.groupRepository.find({
      where: { user, projectId },
    });
  }

  findOne(id: string, user) {
    return this.groupRepository.findOne({
      relations: ['user', 'project'],
      where: { id, user },
    });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group: Group = await this.groupRepository.findOne({
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
    const value = clean(updateGroupDto);
    const result = { ...group, ...value };
    return this.groupRepository.save(result);
  }

  async remove(id: string) {
    const deleteGroup = await this.groupRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteGroup };
    copy.user = null;
    copy.project = null;
    copy.categoryItem = null;
    const result = await this.groupRepository.save(copy);
    await this.groupRepository.remove(result);
    return copy;
  }
}
