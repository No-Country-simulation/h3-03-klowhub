import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';



@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async saveMessage(data: Partial<Message>): Promise <Message>{
    const message = this.messageRepository.create(data);
    return this.messageRepository.save(message);
  }

  async getMessagesByUser(userId: string): Promise <Message[]>{
    return this.messageRepository.find({
      where: [{senderId: userId}, {receiverId: userId}],
      order: {timestamp: 'ASC'},
    });
  }

}
