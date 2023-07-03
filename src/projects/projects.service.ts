import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  create(user, CreateProjectDto: CreateProjectDto) {
    const Project = this.projectRepository.create(CreateProjectDto);
    Project.user = user;
    return this.projectRepository.save(Project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({});
  }

  findAllUserProject(user): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user },
    });
  }

  findAllUserProjectPlan(planId): Promise<Project[]> {
    return this.projectRepository.find({
      where: { planId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.projectRepository.findOne({
      relations: ['user', 'plan'],
      where: { id },
    });
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const Project: Project = await this.projectRepository.findOne({
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
    const value = clean(updateProjectDto);
    const result = { ...Project, ...value };
    return this.projectRepository.save(result);
  }

  async remove(id: string) {
    const deleteProject = await this.projectRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteProject };
    copy.categoryItem = null;
    copy.task = null;
    copy.groups = null;
    copy.informationItem = null;
    const result = await this.projectRepository.save(deleteProject);
    await this.projectRepository.remove(deleteProject);
    return copy;
  }
}
