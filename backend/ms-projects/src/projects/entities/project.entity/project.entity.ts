import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../application.entity/application.entity';



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

  @Column("json", { nullable: true })
  assets: object[];

  @Column()
  userId: string;

  @OneToMany(()=> Application, (application) => application.project)
  applications: Application[];

}
