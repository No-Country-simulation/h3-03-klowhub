import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("simple-array", { nullable: true })
  members: string[];

  @Column({ type: 'enum', enum: ['private', 'group'], default: 'private' })
  type: string;

  @Column({ nullable: true })
  courseId: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}