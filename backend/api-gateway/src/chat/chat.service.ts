import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async createPrivateChat(userIds: number[]) {
    const response = this.httpService.post('/chat/private', { userIds });
    return await lastValueFrom(response);
  }

  async createGroupChat(courseId: number) {
    const response = this.httpService.post('/chat/group', { courseId });
    return await lastValueFrom(response);
  }

  async getChatMessages(chatId: number) {
    const response = this.httpService.get(`/chat/${chatId}/messages`);
    return await lastValueFrom(response);
  }

  async sendMessage(chatId: number, userId: number, content: string, fileUrl?: string) {
    const response = this.httpService.post(`/chat/${chatId}/messages`, {
      userId,
      content,
      fileUrl,
    });
    return await lastValueFrom(response);
  }
}