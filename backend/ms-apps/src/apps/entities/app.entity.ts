import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  platform: string;

  @Column('text', { array: true })
  tools: string[];

  @Column('text', { array: true })
  languages: string[];

  @Column('text', { array: true })
  functionalities: string[];

  @Column()
  sector: string;

  @Column('text', { array: true })
  relatedFunctionalities: string[];

  @Column()
  targetAudience: string;

  @Column()
  advantages: string;

  @Column()
  coverImage: string;

  @Column('text', { array: true })
  mockupImages: string[];

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
}
