import { Injectable } from '@nestjs/common';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryItem } from './entities/category-item.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoryItemsService {
  constructor(
    @InjectRepository(CategoryItem)
    private CategoryItemRepository: Repository<CategoryItem>,
  ) {}
  create(user, CreateCategoryItemDto: CreateCategoryItemDto) {
    const categoryItem = this.CategoryItemRepository.create(
      CreateCategoryItemDto,
    );
    categoryItem.user = user;
    return this.CategoryItemRepository.save(categoryItem);
  }

  findAll(): Promise<CategoryItem[]> {
    return this.CategoryItemRepository.find({});
  }

  findAllCategoryProject(user, projectId): Promise<CategoryItem[]> {
    return this.CategoryItemRepository.find({
      relations: ['groups', 'task', 'informationItem'],
      where: { user, projectId },
    });
  }

  findOne(id: string) {
    return this.CategoryItemRepository.findOne({
      relations: [
        'groups',
        'task',
        'task.categoryItem',
        'informationItem',
        'informationItem.categoryItem',
        'project',
        'user',
      ],
      where: { id },
    });
  }

  findOneUrl(url_1_link: string) {
    return this.CategoryItemRepository.findOne({
      relations: ['groups', 'task', 'informationItem', 'project'],
      where: { url_1_link },
    });
  }

  async update(
    id: string,
    updateCategoryItemDto: UpdateCategoryItemDto,
  ): Promise<CategoryItem> {
    const CategoryItem: CategoryItem =
      await this.CategoryItemRepository.findOne({
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
    const value = clean(updateCategoryItemDto);
    const result = { ...CategoryItem, ...value };
    return this.CategoryItemRepository.save(result);
  }

  async remove(id: string) {
    const deleteCategoryItem = await this.CategoryItemRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteCategoryItem };
    copy.user = null;
    copy.informationItem = null;
    copy.task = null;
    copy.project = null;
    copy.groups = null;
    const result = await this.CategoryItemRepository.save(deleteCategoryItem);
    await this.CategoryItemRepository.remove(result);
    return copy;
  }
}
