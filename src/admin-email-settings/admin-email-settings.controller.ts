import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminEmailSettingsService } from './admin-email-settings.service';
import { CreateAdminEmailSettingDto } from './dto/create-admin-email-setting.dto';
import { UpdateAdminEmailSettingDto } from './dto/update-admin-email-setting.dto';

@Controller('admin-email-settings')
export class AdminEmailSettingsController {
  constructor(
    private readonly adminEmailSettingsService: AdminEmailSettingsService,
  ) {}

  @Post('create')
  create(@Body() createAdminEmailSettingDto: CreateAdminEmailSettingDto) {
    return this.adminEmailSettingsService.create(createAdminEmailSettingDto);
  }

  @Post('sendMail')
  sendMail(@Body() createAdminEmailSettingDto: CreateAdminEmailSettingDto) {
    return this.adminEmailSettingsService.sendMail(createAdminEmailSettingDto);
  }

  @Get('all')
  findAll() {
    return this.adminEmailSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminEmailSettingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminEmailSettingDto: UpdateAdminEmailSettingDto,
  ) {
    return this.adminEmailSettingsService.update(
      id,
      updateAdminEmailSettingDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminEmailSettingsService.remove(id);
  }
}
