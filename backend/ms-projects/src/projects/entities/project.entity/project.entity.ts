import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../application.entity/application.entity';
import { Asset } from '../asset.entity/asset.entity';
import { ProjectStatus } from './project-status.enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  title: string;
  
  @Column()
  platform: string;

  @Column()
  description: string;

  @Column("simple-array", { nullable: true })
  sector: string[];

  @Column()
  methodology: string;

  @Column()
  experienceLevel: string;

  @Column("simple-array", { nullable: true })
  technicalRequirements: string[]; 

  @Column("simple-array", { nullable: true })
  requiredSkills: string[]; 

  @Column()
  days: number;

  @Column('decimal')
  minBudget: number;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PENDIENTE, // Valor por defecto
  })
  status: ProjectStatus;


  @Column('decimal')
  maxBudget: number;

  @Column("text", { array: true, nullable: true })
  additionalRequirements: string[];

  @OneToMany(() => Asset, (asset) => asset.project) // Cambiado a OneToMany para assets
  assets: Asset[];

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column()
  userId: string;

  @Column()
  authorId: string;

  author?: any;


  @OneToMany(()=> Application, (application) => application.project)
  applications: Application[];

}
