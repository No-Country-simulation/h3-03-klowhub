import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddMembersDto } from './dto/add-members.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}


  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Post('group')
  async createGroupChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createGroupChat(createChatDto);
  }

  @Patch(':chatId/members')
  async addMembersToGroupChat(
    @Param('chatId') chatId: string,
    @Body() addMembersDto: AddMembersDto
  ) {
    return this.chatService.addMembersToGroupChat(String(chatId), addMembersDto);
  }

  @Get(':userId')
  async getChatsByUserId(@Param('userId') userId: string) {
    return this.chatService.getChatsByUserId(String(userId));
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(String(chatId));
  }

  @Post(':chatId/messages')
  async createMessage(
    @Param('chatId') chatId: string,
    @Body() createMessageDto: CreateMessageDto
  ) {
    return this.chatService.createMessage(String(chatId), createMessageDto);
  }
  
  @Post('between-users')
  async getChatBetweenUsers(@Body('userId1') userId1: string, @Body('userId2') userId2: string) {
    return this.chatService.getChatBetweenUsers(userId1, userId2);
  }
}
