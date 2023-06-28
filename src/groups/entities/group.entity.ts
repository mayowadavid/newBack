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
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  updatedAt: Date;

  @Column({ nullable: true })
  projectId: string;

  @ManyToOne(() => User, (user) => user.groups)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project, (project) => project.groups)
  @JoinColumn()
  project: Project;

  @OneToMany(() => CategoryItem, (categoryItem) => categoryItem.groups)
  categoryItem: CategoryItem[];
}
