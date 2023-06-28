import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Project } from 'src/projects/entities/project.entity';
import { TrackingUrl } from 'src/tracking-url/entities/tracking-url.entity';
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
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  information: string;

  @Column({ nullable: true, default: 0 })
  clickCount: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  email_notification: boolean;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  due_time: Date;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  due_date_time: Date;

  @Column({ nullable: true })
  url_1_link: string;

  @Column({ nullable: true })
  url_2_link: string;

  @Column({ nullable: true })
  url_1_txt: string;

  @Column({ nullable: true })
  url_2_txt: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  categoryItemId: string;

  @Column({ nullable: true })
  projectId: string;

  @ManyToOne(() => CategoryItem, (categoryItem) => categoryItem.task)
  @JoinColumn()
  categoryItem: CategoryItem;

  @ManyToOne(() => Project, (project) => project.task)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, (user) => user.task)
  @JoinColumn()
  user: User;

  @OneToOne(() => TrackingUrl, (trackUrl) => trackUrl.task)
  trackUrl: User;
}
