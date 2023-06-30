import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminEmailSettingDto } from './create-admin-email-setting.dto';

export class UpdateAdminEmailSettingDto extends PartialType(CreateAdminEmailSettingDto) {}
