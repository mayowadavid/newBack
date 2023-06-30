import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryItemDto } from './create-category-item.dto';

export class UpdateCategoryItemDto extends PartialType(CreateCategoryItemDto) {
  id: string;

  priority: string;

  clicks_count: number;

  visibility: string;

  plan_frequency: string;

  automatic_status: string;

  url_1_link: string;

  url_2_txt: string;

  url_2_link: string;

  projectId: string;

  clickCounts: string;

  groupsId: string;
}
