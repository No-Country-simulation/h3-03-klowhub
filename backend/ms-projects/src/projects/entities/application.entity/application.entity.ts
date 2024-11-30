import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project.entity/project.entity';


@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientProposal: string;

  @Column()
  stage: string;

  @Column()
  status: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  attachments: string;

  @Column()
  priority: string;

  @Column()
  assignedPerson: string;

  @Column()
  activityDescription: string;

  @Column('text', { array: true })
  reviews: string[];

  @Column('int', { default: 0 })
  rating: number;

  @ManyToOne(() => Project, (project) => project.applications)
  project: Project;
}