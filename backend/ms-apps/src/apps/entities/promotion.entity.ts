import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { App } from './app.entity';

@Entity('promocion')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  promoted: string;

  @Column('float')
  percentage: number;

  @ManyToOne(() => App, (application) => application.promotions)
  application: App;
}
