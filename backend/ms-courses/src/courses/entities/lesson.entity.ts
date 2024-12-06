import { CourseModule } from './course-module.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  freeLesson: boolean;

  //La opcion es hacer la relacion a Multimedia-documents
  @Column()
  documents: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => CourseModule, (courseModule) => courseModule.lessons)
  module: CourseModule;
}
