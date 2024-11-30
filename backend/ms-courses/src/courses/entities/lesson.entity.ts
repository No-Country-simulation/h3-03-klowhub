import { courseModules } from './module.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  free: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => courseModules, (module) => module.lessons)
  module: courseModules;
}
