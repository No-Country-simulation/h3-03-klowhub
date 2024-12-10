import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../application.entity/application.entity';



@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  platform: string;

  @Column()
  description: string;

  @Column()
  sector: string;

  @Column()
  methodology: string;

  @Column()
  experienceLevel: string;

  @Column("simple-array", { nullable: true })
  technicalRequirements: string[];

  @Column("simple-array", { nullable: true })
  requiredKnowledge: string[];

  @Column()
  days: number;

  @Column('decimal')
  minBudget: number;

  @Column('decimal')
  maxBudget: number;

  @Column("text", { array: true, nullable: true })
  requiredSkills: string[];

  @Column("json", { nullable: true })
  assets: object[];

  @Column()
  status: string;


  @Column()
  userId: string;

  @OneToMany(()=> Application, (application) => application.project)
  applications: Application[];

}
