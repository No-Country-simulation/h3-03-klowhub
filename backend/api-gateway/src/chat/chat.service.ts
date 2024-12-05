// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios'; 

// @Injectable()
// export class ChatService {
//   constructor(private readonly httpService: HttpService) {}

//   async sendMessage(messageData: any) {
//     const response = await this.httpService.post(
//       'http://ms-chat:3004/chat/send', // URL del microservicio de chat
//       messageData,
//     ).toPromise();
//     return response.data;
//   }

//   async getMessagesByUser(userId: string) {
//     const response = await this.httpService.get(
//       `http://ms-chat:3004/chat/${userId}`, // URL del microservicio de chat
//     ).toPromise();
//     return response.data;
//   }
// }

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  private readonly chatServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // Para acceder a las variables de entorno
  ) {
    // Obtener la URL del microservicio desde las variables de entorno
    this.chatServiceUrl = this.configService.get<string>('CHAT_SERVICE_URL');
  }

  // Método para enviar un mensaje
  async sendMessage(messageData: any): Promise<any> {
    const response = await this.httpService
      .post(`${this.chatServiceUrl}/chat/send`, messageData)
      .toPromise();
    return response.data;
  }

  // Método para obtener mensajes por usuario
  async getMessagesByUser(userId: string): Promise<any> {
    const response = await this.httpService
      .get(`${this.chatServiceUrl}/chat/${userId}`)
      .toPromise();
    return response.data;
  }
}