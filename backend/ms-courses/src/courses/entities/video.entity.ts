import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
// import { Imagen } from './thumbnail_url.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column('float')
  duration: number;

  @Column()
  size: number;

  @Column()
  format: string;

  @Column()
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column()
  thumbnail_url: string;

  @Column()
  thumbnail_width: number;

  @Column()
  thumbnail_height: number;

  @Column()
  created_at: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  // @OneToMany(() => Imagen, (imagen) => imagen.video, { cascade: true })
  // thumbnail_url: Imagen[];
}
