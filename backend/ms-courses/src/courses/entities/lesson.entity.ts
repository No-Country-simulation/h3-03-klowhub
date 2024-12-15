import { CourseModule } from './course-module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  documents: string[];

  @Column({ type: 'simple-array', nullable: true })
  video: string[];

  @Column({ nullable: true })
  freeLesson: boolean;

  @Column({ nullable: true, name: 'link' })
  link: string;

  @ManyToOne(() => CourseModule, (module) => module.lessons)
  @JoinColumn()
  module: CourseModule;
}
