import { Module } from '@nestjs/common';
import { AdminEmailSettingsService } from './admin-email-settings.service';
import { AdminEmailSettingsController } from './admin-email-settings.controller';

@Module({
  controllers: [AdminEmailSettingsController],
  providers: [AdminEmailSettingsService]
})
export class AdminEmailSettingsModule {}
