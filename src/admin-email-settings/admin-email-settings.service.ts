import { Injectable } from '@nestjs/common';
import { CreateAdminEmailSettingDto } from './dto/create-admin-email-setting.dto';
import { UpdateAdminEmailSettingDto } from './dto/update-admin-email-setting.dto';

@Injectable()
export class AdminEmailSettingsService {
  create(createAdminEmailSettingDto: CreateAdminEmailSettingDto) {
    return 'This action adds a new adminEmailSetting';
  }

  findAll() {
    return `This action returns all adminEmailSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminEmailSetting`;
  }

  update(id: number, updateAdminEmailSettingDto: UpdateAdminEmailSettingDto) {
    return `This action updates a #${id} adminEmailSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminEmailSetting`;
  }
}
