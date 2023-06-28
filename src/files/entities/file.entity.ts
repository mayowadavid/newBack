import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  audio: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  gif: string;

  @Column({ nullable: true })
  document: string;
}
