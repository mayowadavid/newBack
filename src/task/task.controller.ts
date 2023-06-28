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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const user = req.user;
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('taskByProjects/:id')
  @UseGuards(AuthGuard('jwt'))
  findAllTaskByProject(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.taskService.findAllTaskByProject(user, id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @Request() req) {
    const user = req.user;
    return this.taskService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const user = req.user;
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
