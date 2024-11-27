import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}