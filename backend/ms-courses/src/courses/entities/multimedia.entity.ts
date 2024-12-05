import {
  Column,
  Entity,
  // JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

export interface Video {
  url: string;
  duration: number;
  size: number;
  resolution: string;
  format: string;
  width: number;
  height: number;
  mimeType: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  createdAt: string;
}
//cambiar a Image
export interface Image {
  url: string;
  size: number;
  width: number;
  height: number;
  format: string;
  mimeType: string;
  createdAt: string;
}

export interface Document {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('jsonb')
  // file: File;

  @Column('jsonb', { nullable: false })
  fileMetadata: Video | Image | Document; // JSON que contiene la metadata específica

  @Column({
    type: 'enum',
    enum: ['video', 'image', 'document'],
    nullable: false,
  })
  fileType: 'video' | 'image' | 'document'; // Indica el tipo de archivo

  // @ManyToOne(() => Course, (course) => course.multimedia)
  // @JoinColumn({ name: 'course_id' }) // Especifica el nombre de la columna
  // course: Promise<Course>;
  @ManyToOne(() => Course, (course) => course.multimedia)
  course: Course;
}
