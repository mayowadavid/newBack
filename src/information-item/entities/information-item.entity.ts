import { CategoryItem } from 'src/category-items/entities/category-item.entity';
import { Project } from 'src/projects/entities/project.entity';
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
export class InformationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  information: string;

  @Column({ nullable: true })
  url_1_link: string;

  @Column({ nullable: true })
  url_1_txt: string;

  @Column({ nullable: true })
  url_2_txt: string;

  @Column({ nullable: true })
  url_2_link: string;

  @Column({ nullable: true })
  posts_per_month: string;

  @Column({ nullable: true })
  posts_today: string;

  @Column({ nullable: true })
  members_total: string;

  @Column({ nullable: true })
  members_new: string;

  @Column({ nullable: true })
  categoryItemId: string;

  @Column({ nullable: true })
  projectId: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @ManyToOne(() => CategoryItem, (categoryItem) => categoryItem.informationItem)
  @JoinColumn()
  categoryItem: CategoryItem;

  @ManyToOne(() => Project, (project) => project.informationItem)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, (user) => user.informationItem)
  @JoinColumn()
  user: User;
}
