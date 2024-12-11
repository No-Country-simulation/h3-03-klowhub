import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { App } from './app.entity';

@Entity('archivo')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileType: string;

  @Column('json')
  fileMetadata: object;

  @ManyToOne(() => App, (application) => application.assets)
  application: App;
}
