import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
} from '@nestjs/common';
import { TrackingUrlService } from './tracking-url.service';
import { CreateTrackingUrlDto } from './dto/create-tracking-url.dto';
import { UpdateTrackingUrlDto } from './dto/update-tracking-url.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tracking-url')
export class TrackingUrlController {
  constructor(private readonly trackingUrlService: TrackingUrlService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTrackingUrlDto: CreateTrackingUrlDto, @Request() req) {
    const user = req.user;
    return this.trackingUrlService.create(createTrackingUrlDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req) {
    const user = req.user;
    return this.trackingUrlService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingUrlService.findOne(id);
  }

  @Post('getclicks')
  geolocation(@Req() req, @Body() clickData: any) {
    const query = req.ip || '127.0.0.1';
    return this.trackingUrlService.submitClickData(query, clickData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackingUrlDto: UpdateTrackingUrlDto,
  ) {
    return this.trackingUrlService.update(id, updateTrackingUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingUrlService.remove(id);
  }
}
