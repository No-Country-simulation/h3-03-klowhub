import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(messageData: any) {
    const response = await this.httpService.post(
      'http://ms-chat:3004/chat/send', // URL del microservicio de chat
      messageData,
    ).toPromise();
    return response.data;
  }

  async getMessagesByUser(userId: string) {
    const response = await this.httpService.get(
      `http://ms-chat:3004/chat/${userId}`, // URL del microservicio de chat
    ).toPromise();
    return response.data;
  }
}