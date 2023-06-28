import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationItemDto } from './create-information-item.dto';

export class UpdateInformationItemDto extends PartialType(
  CreateInformationItemDto,
) {
  id: string;

  information: string;

  url_1_link: string;

  url_1_txt: string;

  url_2_txt: string;

  url_2_link: string;

  posts_per_month: string;

  posts_today: string;

  members_total: string;

  members_new: string;

  categoryItemId: string;

  projectId: string;
}
