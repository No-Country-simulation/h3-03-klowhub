import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  chatId: number;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  emotes: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}