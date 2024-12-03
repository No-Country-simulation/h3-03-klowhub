import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './message.entity';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService){}


  @Post('send')
  async sendMessage(@Body() message: Partial<Message>): Promise<Message>{
    return this.chatService.saveMessage(message);
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: string): Promise<Message[]>{
    return this.chatService.getMessagesByUser(userId);
  }




}
