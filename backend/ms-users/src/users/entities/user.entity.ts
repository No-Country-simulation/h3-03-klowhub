import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'explorer' }) // modo por defecto
  role: string; // 'explorer' o 'seller'

  @OneToOne(() => Seller, (seller) => seller.user, { nullable: true })
  @JoinColumn()
  seller?: Seller;
}
