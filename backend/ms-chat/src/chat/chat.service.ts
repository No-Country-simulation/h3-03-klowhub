// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Message } from './entities/message.entity';
// import { Chat } from './entities/chat.entity';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';

// @Injectable()
// export class ChatService {
//   constructor( private readonly httpService: HttpService,
//     @InjectRepository(Chat) private chatRepo: Repository<Chat>,
//     @InjectRepository(Message) private messageRepo: Repository<Message>,
//   ) {}

//   async createPrivateChat(userIds: number[]): Promise<Chat> {
//     const chat = this.chatRepo.create({ type: 'private' });
//     return await this.chatRepo.save(chat);
//   }

//   async createGroupChat(courseId: number): Promise<Chat> {
//     const chat = this.chatRepo.create({ type: 'group', courseId });
//     return await this.chatRepo.save(chat);
//   }

//   async sendMessage(chatId: number, userId: number, content: string, fileUrl?: string): Promise<Message> {
//     // Validar mensajes sin correos ni teléfonos
//     if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/.test(content)) {
//       throw new Error('Prohibido enviar correos electrónicos');
//     }

//     const message = this.messageRepo.create({ chatId, userId, content, fileUrl });
//     return await this.messageRepo.save(message);
//   }

//   async getMessages(chatId: number): Promise<Message[]> {
//     return await this.messageRepo.find({ where: { chatId }, order: { createdAt: 'ASC' } });
//   }

//   async createMessage(chatId: number, userId: number, content: string, fileUrl?: string) {
//     const chat = await this.chatRepo.findOne({ where: { id: chatId } });
//     if (!chat) throw new Error('Chat not found');

//     const message = this.messageRepo.create({ chat, userId, content, fileUrl });
//     return await this.messageRepo.save(message);
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddMembersDto } from './dto/add-members.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatGateway } from './chat.gateway';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    private readonly httpService: HttpService,
    private readonly chatGateway: ChatGateway
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const { members, type, courseId } = createChatDto;

    if (members.length !== 2 && type === 'private') {
      throw new Error('A private chat must have exactly 2 members.');
    }

    const newChat = this.chatRepository.create({
      members,
      type,
      courseId,
    });

    return this.chatRepository.save(newChat);
  }

  async createGroupChat(createChatDto: CreateChatDto): Promise<Chat> {
    const { members, type, courseId } = createChatDto;

    if (type !== 'group') {
      throw new Error('Type must be group for group chats.');
    }

    const newChat = this.chatRepository.create({
      members,
      type,
      courseId,
    });

    return this.chatRepository.save(newChat);
  }

  async addMembersToGroupChat(chatId: number, addMembersDto: AddMembersDto): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });

    if (!chat || chat.type !== 'group') {
      throw new NotFoundException('Group chat not found.');
    }

    chat.members = Array.from(new Set([...chat.members, ...addMembersDto.members]));

    return this.chatRepository.save(chat);
  }

  async getChatsByUserId(userId: number): Promise<any[]> {
    const chats = await this.chatRepository.find();

    const userChats = chats.filter(chat => chat.members.includes(userId.toString()));

    if (userChats.length === 0) {
      throw new NotFoundException('No chats found for this user.');
    }

    const enrichedChats = await Promise.all(
      userChats.map(async (chat) => {
        const membersDetails = await Promise.all(
          chat.members.map(async (memberId) => {
            const { data: user } = await this.httpService
              .get(`${process.env.MS_USERS_ENDPOINT}/${memberId}`)
              .toPromise();
            return user;
          })
        );

        return { ...chat, membersDetails };
      })
    );

    return enrichedChats;
  }

  async getChatMessages(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({ where: { chatId } });

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this chat.');
    }

    return messages;
  }

  async createMessage(chatId: number, createMessageDto: CreateMessageDto): Promise<Message> {
    const { userId, content, fileUrl, emotes } = createMessageDto;
  
    // Crear el mensaje
    const newMessage = this.messageRepository.create({
      chatId,
      userId,
      content,
      fileUrl,
      emotes,
    });
  
    // Guardar el mensaje en la base de datos
    const savedMessage = await this.messageRepository.save(newMessage);
  
    // Emitir el mensaje al Gateway para notificar a los clientes conectados
    this.chatGateway.server.to(`chat-${chatId}`).emit('serverResponse', savedMessage);
  
    return savedMessage;
  }
}
