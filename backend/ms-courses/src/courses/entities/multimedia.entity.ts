import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

interface Video {
  url: string;
  duration: number;
  size: number;
  resolution: string;
  format: string;
  width: number;
  height: number;
  mimeType: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  created_at: string;
}

interface CoverImg {
  url: string;
  size: number;
  width: number;
  height: number;
  format: string;
  mimeType: string;
  created_at: string;
}

interface Document {
  url: string;
  size: number;
  mimeType: string;
  created_at: string;
}

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  video: Video;

  @Column('jsonb')
  coverImg: CoverImg;

  @Column('jsonb')
  documents: Document[];

  @ManyToOne(() => Course, (course) => course.multimedia, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
