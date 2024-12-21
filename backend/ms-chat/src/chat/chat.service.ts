import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddMembersDto } from './dto/add-members.dto';
import { CreateMessageDto } from './dto/create-message.dto';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    private readonly httpService: HttpService,
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

  async addMembersToGroupChat(chatId: string, addMembersDto: AddMembersDto): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });

    if (!chat || chat.type !== 'group') {
      throw new NotFoundException('Group chat not found.');
    }

    chat.members = Array.from(new Set([...chat.members, ...addMembersDto.members]));

    return this.chatRepository.save(chat);
  }

  async getChatsByUserId(userId: string): Promise<any[]> {
    const chats = await this.chatRepository.find({ relations: ["messages"] });

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

  async getChatMessages(chatId: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({ where: { chatId } });

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this chat.');
    }

    return messages;
  }

  async createMessage(chatId: string, createMessageDto: CreateMessageDto): Promise<Message> {
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
    
    // Enviar el mensaje al cliente a través del gateway
    return savedMessage;
  }


  async getChatBetweenUsers(userId1: string, userId2: string): Promise<{ chat: Chat; messages: Message[] }> {
    const chat = await this.chatRepository.findOne({
      where: { members: [userId1, userId2].sort().join(',') },
      relations: ['messages'],
    });

    if (!chat) {
      throw new NotFoundException('No chat found between these users.');
    }

    const messages = await this.messageRepository.find({
      where: { chatId: chat.id },
      order: { createdAt: 'ASC' },
    });

    return { chat, messages };
  }
}
