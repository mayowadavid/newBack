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
import { CategoryItemsService } from './category-items.service';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('category-items')
export class CategoryItemsController {
  constructor(private readonly categoryItemsService: CategoryItemsService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCategoryItemDto: CreateCategoryItemDto, @Request() req) {
    const user = req.user;
    return this.categoryItemsService.create(user, createCategoryItemDto);
  }

  @Get()
  findAll() {
    return this.categoryItemsService.findAll();
  }

  @Get('categoryByProject/:id')
  @UseGuards(AuthGuard('jwt'))
  findAllCategoryProject(@Param('id') id: string, @Request() req) {
    const user = req.user;
    return this.categoryItemsService.findAllCategoryProject(user, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryItemsService.findOne(id);
  }

  @Get('findUrl/:id')
  findOneUrl(@Param('id') id: string) {
    return this.categoryItemsService.findOneUrl(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryItemDto: UpdateCategoryItemDto,
  ) {
    return this.categoryItemsService.update(id, updateCategoryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryItemsService.remove(id);
  }
}
