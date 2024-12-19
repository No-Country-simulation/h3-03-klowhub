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
    return this.chatService.addMembersToGroupChat(Number(chatId), addMembersDto);
  }

  @Get(':userId')
  async getChatsByUserId(@Param('userId') userId: string) {
    return this.chatService.getChatsByUserId(Number(userId));
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(Number(chatId));
  }

  @Post(':chatId/messages')
  async createMessage(
    @Param('chatId') chatId: string,
    @Body() createMessageDto: CreateMessageDto
  ) {
    return this.chatService.createMessage(Number(chatId), createMessageDto);
  }
}



  // @Post('private')
  // async createPrivateChat(@Body('userIds') userIds: number[]) {
  //   return await this.chatService.createPrivateChat(userIds);
  // }

  // @Post('group')
  // async createGroupChat(@Body('courseId') courseId: number) {
  //   return await this.chatService.createGroupChat(courseId);
  // }

  // @Get(':chatId/messages')
  // async getMessages(@Param('chatId') chatId: number) {
  //   return await this.chatService.getMessages(chatId);
  // }
  // @Post(':chatId/messages')
  // async createMessage(
  //   @Param('chatId') chatId: number,
  //   @Body('userId') userId: number,
  //   @Body('content') content: string,
  //   @Body('fileUrl') fileUrl?: string,
  // ) {
  //   return await this.chatService.createMessage(chatId, userId, content, fileUrl);
  // }
// }