import { PartialType } from '@nestjs/mapped-types';
import { CreateClickDatumDto } from './create-click-datum.dto';

export class UpdateClickDatumDto extends PartialType(CreateClickDatumDto) {
  id: string;

  ip_address: string;

  device: string;

  country: string;

  region: string;

  city: boolean;

  referrer_url: string;

  operating_system: string;

  browser: string;

  browser_language: string;

  screen_resolution: string;

  ip_lookup_status: string;

  region_name: string;

  country_code: string;

  isp: string;

  connection_type: string;

  network_speed: string;

  latitude: string;

  longtitude: string;

  zipcode: string;

  trackingUrlId: string;
}
