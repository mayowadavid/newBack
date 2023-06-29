import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private PlanRepository: Repository<Plan>,
  ) {}
  create(user, CreatePlanDto: CreatePlanDto) {
    const Plan = this.PlanRepository.create(CreatePlanDto);
    Plan.user = user;
    return this.PlanRepository.save(Plan);
  }

  findAll(): Promise<Plan[]> {
    return this.PlanRepository.find({
      relations: ['project'],
    });
  }

  findOne(user, id: string) {
    return this.PlanRepository.findOne({
      relations: ['user'],
      where: { id, user },
    });
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const Plan: Plan = await this.PlanRepository.findOne({
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
    const value = clean(updatePlanDto);
    const result = { ...Plan, ...value };
    return this.PlanRepository.save(result);
  }

  async remove(id: string) {
    const deletePlan = await this.PlanRepository.findOne({
      where: { id },
    });
    const copy = { ...deletePlan };
    copy.user = null;
    copy.project = null;
    const result = await this.PlanRepository.save(deletePlan);
    await this.PlanRepository.remove(deletePlan);
    return copy;
  }
}
