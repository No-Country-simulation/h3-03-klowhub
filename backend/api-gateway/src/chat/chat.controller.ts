import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat/private')
  async createPrivateChat(@Body('userIds') userIds: number[]) {
    return this.chatService.createPrivateChat(userIds);
  }

  @Post('chat/group')
  async createGroupChat(@Body('courseId') courseId: number) {
    return this.chatService.createGroupChat(courseId);
  }

  @Get('chat/:chatId/messages')
  async getChatMessages(@Param('chatId') chatId: number) {
    return this.chatService.getChatMessages(chatId);
  }
}