import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  id: string;

  information: string;

  clickCount: number;

  title: string;

  priority: string;

  email_notification: boolean;

  due_time: Date;

  due_date_time: Date;

  url_1_link: string;

  url_2_link: string;

  url_1_txt: string;

  url_2_txt: string;

  status: string;

  categoryItemId: string;

  projectId: string;
}
