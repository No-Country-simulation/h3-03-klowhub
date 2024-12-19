import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Chat } from './entities/chat.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor( private readonly httpService: HttpService,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  async createPrivateChat(userIds: number[]): Promise<Chat> {
    const chat = this.chatRepo.create({ type: 'private' });
    return await this.chatRepo.save(chat);
  }

  async createGroupChat(courseId: number): Promise<Chat> {
    const chat = this.chatRepo.create({ type: 'group', courseId });
    return await this.chatRepo.save(chat);
  }

  async sendMessage(chatId: number, userId: number, content: string, fileUrl?: string): Promise<Message> {
    // Validar mensajes sin correos ni teléfonos
    if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/.test(content)) {
      throw new Error('Prohibido enviar correos electrónicos');
    }

    const message = this.messageRepo.create({ chatId, userId, content, fileUrl });
    return await this.messageRepo.save(message);
  }

  async getMessages(chatId: number): Promise<Message[]> {
    return await this.messageRepo.find({ where: { chatId }, order: { createdAt: 'ASC' } });
  }
  async createMessage(chatId: number, userId: number, content: string, fileUrl?: string) {
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    if (!chat) throw new Error('Chat not found');

    const message = this.messageRepo.create({ chat, userId, content, fileUrl });
    return await this.messageRepo.save(message);
  }
}