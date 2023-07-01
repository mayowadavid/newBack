import { Module } from '@nestjs/common';
import { AdminEmailSettingsService } from './admin-email-settings.service';
import { AdminEmailSettingsController } from './admin-email-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEmailSetting } from './entities/admin-email-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEmailSetting])],
  controllers: [AdminEmailSettingsController],
  providers: [AdminEmailSettingsService],
})
export class AdminEmailSettingsModule {}
