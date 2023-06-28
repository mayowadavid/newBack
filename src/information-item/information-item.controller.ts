import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { InformationItemService } from './information-item.service';
import { CreateInformationItemDto } from './dto/create-information-item.dto';
import { UpdateInformationItemDto } from './dto/update-information-item.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('information-item')
export class InformationItemController {
  constructor(
    private readonly informationItemService: InformationItemService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createInformationItemDto: CreateInformationItemDto,
    @Request() req,
  ) {
    const user = req.user;
    return this.informationItemService.create(createInformationItemDto, user);
  }

  @Get()
  findAll() {
    return this.informationItemService.findAll();
  }

  @Get('informationByProjects/:id')
  @UseGuards(AuthGuard('jwt'))
  findAllInformationByProject(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.informationItemService.findAllInformationItemByProject(
      user,
      id,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const user = req.user;
    return this.informationItemService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateInformationItemDto: UpdateInformationItemDto,
    @Request() req,
  ) {
    const user = req.user;
    return this.informationItemService.update(
      id,
      updateInformationItemDto,
      user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationItemService.remove(id);
  }
}
