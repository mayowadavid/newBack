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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const user = req.user;
    return this.projectsService.create(user, createProjectDto);
  }

  @Get('allProjects')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('userProjects')
  @UseGuards(AuthGuard('jwt'))
  findAllUserProject(@Request() req) {
    const user = req.user;
    return this.projectsService.findAllUserProject(user);
  }

  @Get(':planId')
  findAllUserProjectByPlan(@Param('planId') planId: string) {
    return this.projectsService.findAllUserProjectPlan(planId);
  }

  @Get('oneProject/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
