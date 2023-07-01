import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminEmailSettingDto } from './create-admin-email-setting.dto';

export class UpdateAdminEmailSettingDto extends PartialType(
  CreateAdminEmailSettingDto,
) {
  id: string;

  email: string;

  password: string;

  sender: string;

  incoming_mail: string;

  outgoing_mail: string;

  s_imap_port: number;

  s_pop3_port: number;

  s_smtp_port: number;

  n_imap_port: number;

  n_pop3_port: number;

  n_smtp_port: number;

  webmail_url: string;

  technical_information: string;

  information: string;
}
