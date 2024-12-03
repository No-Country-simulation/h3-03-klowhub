import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  size: number;

  @Column()
  width: number;

  @Column()
  format: string;

  @Column()
  created_at: string;
}
