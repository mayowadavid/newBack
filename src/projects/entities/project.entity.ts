import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Group } from 'src/groups/entities/group.entity';
import { InformationItem } from 'src/information-item/entities/information-item.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  planId: string;

  @Column({ nullable: true })
  categoryItemId: string;

  @ManyToOne(() => User, (user) => user.project)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.project)
  @JoinColumn()
  plan: Plan;

  @OneToMany(() => CategoryItem, (categoryItem) => categoryItem.project)
  categoryItem: CategoryItem[];

  @OneToMany(() => Task, (task) => task.project)
  task: Task[];

  @OneToMany(() => Group, (group) => group.project)
  groups: Group[];

  @OneToMany(
    () => InformationItem,
    (informationItem) => informationItem.project,
  )
  informationItem: Task[];
}
