import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { App } from './app.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ['image', 'video', 'audio', 'document'] })
  fileType: string;

  @Column('json')
  fileMetadata: object;

  @ManyToOne(() => App, (application) => application.assets, {
    onDelete: 'CASCADE',
  })
  application: App;
}
