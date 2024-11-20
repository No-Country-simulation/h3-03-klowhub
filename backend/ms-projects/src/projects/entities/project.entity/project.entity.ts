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

  @Column()
  technicalRequirements: string;

  @Column()
  days: number;

  @Column('decimal')
  budget: number;

  @Column()
  requiredSkills: string;

  @Column()
  requiredFiles: string;

  @Column('text', {array: true})
  reviews: string[];

  @Column('int', {default: 0 })
  rating: number;

  @OneToMany(()=> Application, (application) => application.project)
  applications: Application[];

}
