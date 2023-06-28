import { TrackingUrl } from 'src/tracking-url/entities/tracking-url.entity';
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
export class ClickDatum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  city: boolean;

  @Column({ nullable: true })
  referrer_url: string;

  @Column({ nullable: true })
  operating_system: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  browser_language: string;

  @Column({ nullable: true })
  screen_resolution: string;

  @Column({ nullable: true })
  ip_lookup_status: string;

  @Column({ nullable: true })
  region_name: string;

  @Column({ nullable: true })
  country_code: string;

  @Column({ nullable: true })
  isp: string;

  @Column({ nullable: true })
  connection_type: string;

  @Column({ nullable: true })
  network_speed: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longtitude: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  trackingUrlId: string;

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

  @ManyToOne(() => TrackingUrl, (trackingUrl) => trackingUrl.clickDatum)
  @JoinColumn()
  trackingUrl: TrackingUrl;
}
