import { Injectable } from '@nestjs/common';
import { CreateTrackingUrlDto } from './dto/create-tracking-url.dto';
import { UpdateTrackingUrlDto } from './dto/update-tracking-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingUrl } from './entities/tracking-url.entity';
import * as UAParser from 'ua-parser-js';
import * as geoip from 'geoip-lite';
import axios from 'axios';
import { ClickDatum } from 'src/click-data/entities/click-datum.entity';
import { ClickDataService } from 'src/click-data/click-data.service';

@Injectable()
export class TrackingUrlService {
  constructor(
    @InjectRepository(TrackingUrl)
    private TrackingUrlRepository: Repository<TrackingUrl>,
    private clickDataService: ClickDataService,
  ) {}

  create(CreateTrackingUrlDto: CreateTrackingUrlDto, user) {
    const trackingUrl = this.TrackingUrlRepository.create(CreateTrackingUrlDto);
    trackingUrl.user = user;
    return this.TrackingUrlRepository.save(trackingUrl);
  }

  findAll(user): Promise<TrackingUrl[]> {
    return this.TrackingUrlRepository.find({ where: { user } });
  }

  findOne(id: string) {
    return this.TrackingUrlRepository.findOne({
      relations: ['tasks'],
      where: { id },
    });
  }

  async submitClickData(query: string, clickDtata: any, userAgent) {
    const state = query;
    const mock = clickDtata;
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();
    const browser = result.browser?.name;
    const device =
      (await result.device.type) != undefined ? result.device.type : 'PC';
    const res = await axios.post(`http://ip-api.com/json/${state}`);
    const {
      status,
      country,
      countryCode,
      region,
      regionName,
      city,
      zip,
      lat,
      lon,
      isp,
      org,
    } = res.data;
    mock.browser = browser;
    mock.device = device;
    mock.ip_address = state;
    mock.country = country;
    mock.region = region;
    mock.city = city;
    mock.ip_lookup_status = status;
    mock.region_name = regionName;
    mock.country_code = countryCode;
    mock.isp = isp;
    mock.latitude = lat;
    mock.longtitude = lon;
    mock.zipcode = zip;
    mock.connection_type = org;
    const trackUrl = await this.TrackingUrlRepository.findOne({
      where: { tracking_url: mock.tracking_url },
    });
    mock.trackingUrl = trackUrl;
    await this.clickDataService.create(mock);
    return trackUrl;
  }

  async update(
    id: string,
    updateTrackingUrlDto: UpdateTrackingUrlDto,
  ): Promise<TrackingUrl> {
    const TrackingUrl: TrackingUrl = await this.TrackingUrlRepository.findOne({
      where: {
        id,
      },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateTrackingUrlDto);
    const result = { ...TrackingUrl, ...value };
    return this.TrackingUrlRepository.save(result);
  }

  async remove(id: string) {
    const deleteTrackingUrl = await this.TrackingUrlRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteTrackingUrl };
    copy.user = null;
    copy.clickDatum = null;
    copy.tasks = null;
    const result = await this.TrackingUrlRepository.save(copy);
    await this.TrackingUrlRepository.remove(result);
    return copy;
  }
}
