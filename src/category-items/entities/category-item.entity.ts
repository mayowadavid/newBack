import { Group } from 'src/groups/entities/group.entity';
import { InformationItem } from 'src/information-item/entities/information-item.entity';
import { Project } from 'src/projects/entities/project.entity';
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
export class CategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  item_title: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  information: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true, default: 0 })
  clicks_count: number;

  @Column({ nullable: true })
  visibility: string;

  @Column({ nullable: true })
  plan_frequency: string;

  @Column({ nullable: true })
  automatic_status: string;

  @Column({ nullable: true })
  url_1_link: string;

  @Column({ nullable: true })
  url_2_txt: string;

  @Column({ nullable: true })
  url_2_link: string;

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
  projectId: string;

  @Column({ nullable: true })
  groupsId: string;

  @ManyToOne(() => User, (user) => user.categoryItem)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => InformationItem,
    (informationItem) => informationItem.categoryItem,
  )
  informationItem: InformationItem[];

  @OneToMany(() => Task, (task) => task.categoryItem)
  task: Task[];

  @ManyToOne(() => Project, (project) => project.categoryItem)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Group, (group) => group.categoryItem)
  @JoinColumn()
  groups: Group;
}
