import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  id: string;

  name: string;

  image: string;

  audio: string;

  video: string;

  gif: string;

  document: string;
}
