import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Promotion } from './promotion.entity'; // Asegúrate de que esta importación sea correcta
import { Asset } from './asset.entity'; // Asegúrate de que esta importación sea correcta

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column()
  platform: string;

  @Column({ type: 'simple-array', name: 'languages' }) // Cambiado a simple-array
  languages: string[];

  @Column({ type: 'simple-array', name: 'sector' }) // Cambiado a simple-array
  sector: string[];

  @Column('simple-array', { name: 'functionalities' }) // Cambiado a simple-array
  functionalities: string[];

  @Column({ type: 'simple-array', name: 'tools' }) // Cambiado a simple-array, renombrado de toolsAndPlatforms
  tools: string[];

  @Column({ type: 'text' }) // Cambiado a text para manejar texto largo
  targetAudience: string;

  @Column({ type: 'text' }) // Cambiado a text para manejar texto largo
  advantages: string;

  @Column('simple-array', { name: 'tags' }) // Cambiado a simple-array
  tags: string[];

  @Column('simple-array', { name: 'features' }) // Cambiado a simple-array
  features: string[];

  @Column({ type: 'text' }) // Cambiado a text para manejar texto largo
  views: string;

  @Column({ type: 'text' }) // Cambiado a text para manejar texto largo
  appIncludes: string;

  @Column({ type: 'text', name: 'fullDescription' }) // Cambiado a text para manejar texto largo
  fullDescription: string;

  @Column()
  coverImage: string;

  @Column()
  mobileVersionLink: string;

  @Column()
  desktopVersionLink: string;

  @Column()
  isPromotion: boolean;

  @Column()
  course: string;

  @Column()
  discount: string;

  @Column()
  rating: string;

  @Column()
  review: string;

  @Column()
  emailToAccess: string;

  @OneToMany(() => Asset, (asset) => asset.application, { cascade: true }) // cascade: true para que se guarden los assets
  assets: Asset[];

  @JoinColumn() // Para relacionar con la tabla de promociones
  @OneToOne(() => Promotion)
  promotion: Promotion; // Relacion uno a uno con Promotion
}
