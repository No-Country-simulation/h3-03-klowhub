import { CourseModule } from './course-module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Multimedia } from './multimedia.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  // @Column({ type: 'simple-array', nullable: true })
  // documents: string[];
  @Column({ type: 'jsonb', nullable: true })
  documents: object;

  // @Column({ type: 'simple-array', nullable: true })
  // video: string[];
  @Column({ type: 'jsonb', nullable: true })
  video: object;

  @Column({ nullable: true })
  freeLesson: boolean;

  @Column({ nullable: true, name: 'link' })
  link: string;

  @ManyToOne(() => CourseModule, (module) => module.lessons)
  @JoinColumn()
  module: CourseModule;

  // @OneToMany(() => Multimedia, (multimedia) => multimedia.lesson, {
  //   cascade: true, // Esto asegura que al crear o actualizar una lección, los multimedia asociados se manejen correctamente
  //   nullable: true,
  // })
  // multimedia: Multimedia[];
}
