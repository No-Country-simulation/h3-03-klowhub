import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project.entity/project.entity';


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
//cambiar a Image
interface Image {
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
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column('jsonb', { nullable: false })
  fileMetadata: Video | Image | Document; // JSON que contiene la metadata específica

  @Column({
    type: 'enum',
    enum: ['video', 'image', 'document'],
    nullable: false,
  })
  fileType: 'video' | 'image' | 'document'; // Indica el tipo de archivo

  @ManyToOne(() => Project, (project) => project.assets, { onDelete: 'CASCADE' }) // Relación inversa
  project: Project; // Esto permite la relación inversa
}
