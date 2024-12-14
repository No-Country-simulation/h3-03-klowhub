import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('uuid')
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Asegura hasta 2 decimales
  price: string;

  @Column()
  shortDescription: string;

  @Column()
  platform: string;

  @Column()
  language: string;

  @Column({ type: 'json', name: 'sector' }) // Cambiado a simple-array
  sector: string[];

  @Column('json', { name: 'functionalities' }) // Cambiado a simple-array
  functionalities: string[];

  @Column({ type: 'json', name: 'toolsAndPlatforms' }) // Cambiado a simple-array, renombrado de toolsAndPlatforms
  toolsAndPlatforms: string[];

  @Column('json', { name: 'tags' }) // Cambiado a simple-array
  tags: string[];

  @Column('json', { name: 'features' }) // Cambiado a simple-array
  features: string[];

  @Column('json', { name: 'targetAudience' }) // Cambiado a simple-array
  targetAudience: string[];

  @Column('json', { name: 'views' }) // Cambiado a simple-array
  views: string[];

  @Column({ type: 'text', name: 'fullDescription' }) // Cambiado a text para manejar texto largo
  fullDescription: string;

  @Column('json', { name: 'appIncludes' }) // Cambiado a simple-array
  appIncludes: string[];

  // @Column()
  // coverImg: string;

  @Column()
  desktopLink: string;

  @Column()
  mobileLink: string;

  // @Column('simple-array', { name: 'assets' }) // Cambiado a simple-array
  // assets: string[];

  @ManyToOne(() => Asset) // Cambiado a ManyToOne para coverImg
  coverImg: Asset;

  @OneToMany(() => Asset, (asset) => asset.application) // Cambiado a OneToMany para assets
  assets: Asset[];

  @Column('jsonb', { name: 'promotion', nullable: true })
  promotion: object;
}
