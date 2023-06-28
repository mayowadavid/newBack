import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClickDataService } from './click-data.service';
import { CreateClickDatumDto } from './dto/create-click-datum.dto';
import { UpdateClickDatumDto } from './dto/update-click-datum.dto';

@Controller('click-data')
export class ClickDataController {
  constructor(private readonly clickDataService: ClickDataService) {}

  @Post()
  create(@Body() createClickDatumDto: CreateClickDatumDto) {
    return this.clickDataService.create(createClickDatumDto);
  }

  @Get()
  findAll() {
    return this.clickDataService.findAll();
  }

  @Get('trackUrlClick/:id')
  findAllTrackUrlClick(@Param('id') id: string) {
    return this.clickDataService.findAllTrackUrlClick(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clickDataService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClickDatumDto: UpdateClickDatumDto,
  ) {
    return this.clickDataService.update(id, updateClickDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clickDataService.remove(id);
  }
}
