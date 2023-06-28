import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { InformationItem } from 'src/information-item/entities/information-item.entity';
import { TrackingUrl } from 'src/tracking-url/entities/tracking-url.entity';

export enum UserStatus {
  BANNED = 'banned',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export enum UserRole {
  ADMINISTRATOR = 'Administrator',
  Moderator = 'Moderator',
  USER = 'User',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  userName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, name: 'refreshtoken' })
  refreshToken: string;

  @Column({ type: 'date', nullable: true, name: 'refreshtokenexp' })
  refreshTokenExp: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: UserStatus,
    default: 'approved',
  })
  status: UserStatus;

  @Column({
    nullable: true,
    type: 'enum',
    enum: UserRole,
    default: 'user',
  })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  updatedAt: Date;

  @Column({ nullable: true })
  projectId: string;

  @Column({ nullable: true })
  planId: string;

  @OneToMany(() => Project, (project) => project.user)
  project: Project[];

  @OneToMany(() => Group, (groups) => groups.user)
  groups: Group[];

  @OneToMany(() => Plan, (plan) => plan.user)
  @JoinColumn()
  plan: Plan[];

  @OneToMany(() => CategoryItem, (categoryItem) => categoryItem.user)
  categoryItem: CategoryItem[];

  @OneToMany(() => Task, (task) => task.user)
  task: Task[];

  @OneToMany(() => InformationItem, (informationItem) => informationItem.user)
  informationItem: InformationItem[];

  @OneToMany(() => TrackingUrl, (trackingUrl) => trackingUrl.user)
  trackingUrl: TrackingUrl[];
}
