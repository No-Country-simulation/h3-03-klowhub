import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(@Body() messageData: any) {
    return this.chatService.sendMessage(messageData);
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: string) {
    return this.chatService.getMessagesByUser(userId);
  }
}