import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingUrlDto } from './create-tracking-url.dto';

export class UpdateTrackingUrlDto extends PartialType(CreateTrackingUrlDto) {
  id: string;

  tracking_url: string;

  destination_url: string;

  seo_title: string;

  seo_description: string;

  seo_image_url: string;

  facebook_link: string;

  taskId: string;
}
