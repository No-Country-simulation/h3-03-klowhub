import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { Course } from './course.entity';

@Entity()
export class CourseModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.modules, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module, {
    cascade: true,
    eager: false,
  })
  lessons: Lesson[];
}
