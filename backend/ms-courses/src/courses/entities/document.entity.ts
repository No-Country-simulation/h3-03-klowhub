import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity()
export class Documents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  size: string;

  @Column()
  mimeType: string;

  @Column()
  created_at: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
