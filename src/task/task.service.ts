import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
  ) {}
  create(CreateTaskDto: CreateTaskDto, user) {
    const Task = this.TaskRepository.create(CreateTaskDto);
    Task.user = user;
    return this.TaskRepository.save(Task);
  }

  findAll(): Promise<Task[]> {
    return this.TaskRepository.find({});
  }

  findAllTaskByProject(user, projectId): Promise<Task[]> {
    return this.TaskRepository.find({
      where: { user, projectId },
    });
  }

  findOne(id: string, user) {
    return this.TaskRepository.findOne({
      where: { id, user },
      relations: ['user'],
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user): Promise<Task> {
    const Task: Task = await this.TaskRepository.findOne({
      where: {
        id,
        user,
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
    const value = clean(updateTaskDto);
    const result = { ...Task, ...value };
    return this.TaskRepository.save(result);
  }

  async remove(id: string) {
    const deleteTask = await this.TaskRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteTask };
    copy.categoryItem = null;
    copy.project = null;
    copy.user = null;
    const result = await this.TaskRepository.save(deleteTask);
    await this.TaskRepository.remove(deleteTask);
    return copy;
  }
}
