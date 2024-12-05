import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('private')
  async createPrivateChat(@Body('userIds') userIds: number[]) {
    return await this.chatService.createPrivateChat(userIds);
  }

  @Post('group')
  async createGroupChat(@Body('courseId') courseId: number) {
    return await this.chatService.createGroupChat(courseId);
  }

  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: number) {
    return await this.chatService.getMessages(chatId);
  }
}