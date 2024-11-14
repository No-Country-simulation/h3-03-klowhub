import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
