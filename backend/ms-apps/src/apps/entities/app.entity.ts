import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Promotion } from './promotion.entity';
import { Asset } from './asset.entity';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'shortDescription' })
  shortDescription: string;

  @Column()
  platform: string;

  @Column({ name: 'language' })
  languages: string;

  @Column('text', { array: true, name: 'functionalities' })
  functionalities: string[];

  @Column()
  sector: string;

  @Column('text', { array: true, name: 'toolsAndPlatforms' })
  tools: string[];

  @Column()
  targetAudience: string;

  @Column()
  advantages: string;

  @Column('text', { array: true, name: 'tags' })
  tags: string[];

  @Column('text', { array: true, name: 'features' })
  features: string[];

  @Column()
  views: string;

  @Column()
  appIncludes: string;

  @Column('text', { name: 'fullDescription' })
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

  @Column('text', { array: true, name: 'assetsIds' })
  assetsIds: string[];

  @OneToMany(() => Asset, (asset) => asset.application)
  assets: Asset[];

  @OneToMany(() => Promotion, (promotion) => promotion.application)
  promotions: Promotion[];
}
