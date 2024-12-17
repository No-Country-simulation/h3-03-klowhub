import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../application.entity/application.entity';
import { Asset } from '../asset.entity/asset.entity';


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

  @Column('decimal')
  maxBudget: number;

  @Column("text", { array: true, nullable: true })
  additionalRequirements: string[];

  @OneToMany(() => Asset, (asset) => asset.project) // Cambiado a OneToMany para assets
  assets: Asset[];

  @Column()
  userId: string;

  @OneToMany(()=> Application, (application) => application.project)
  applications: Application[];

}
