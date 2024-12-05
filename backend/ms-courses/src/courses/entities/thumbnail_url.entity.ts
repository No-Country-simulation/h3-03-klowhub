import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class Thumbnail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  thumbnail_url: string;

  @ManyToOne(() => Video, (video) => video.thumbnail_url, {
    onDelete: 'CASCADE',
  })
  video: Video;
}
