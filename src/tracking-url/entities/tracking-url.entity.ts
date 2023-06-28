import { ClickDatum } from 'src/click-data/entities/click-datum.entity';
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
export class TrackingUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tracking_url: string;

  @Column({ nullable: true })
  destination_url: string;

  @Column({ nullable: true })
  seo_title: string;

  @Column({ nullable: true })
  seo_description: string;

  @Column({ nullable: true })
  seo_image_url: string;

  @Column({ nullable: true })
  facebook_link: string;

  @CreateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  updatedAt: Date;

  @Column({ nullable: true })
  taskId: string;

  @ManyToOne(() => User, (user) => user.trackingUrl)
  @JoinColumn()
  user: User;

  @OneToOne(() => Task, (task) => task.trackUrl)
  @JoinColumn()
  task: Task;

  @OneToMany(() => ClickDatum, (clickDatum) => clickDatum.trackingUrl)
  clickDatum: ClickDatum;
}
