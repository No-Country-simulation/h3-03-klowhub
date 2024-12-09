import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gatewayService: ChatService) {}

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, payload: { chatId: number }) {
    const { chatId } = payload;
    client.join(`chat-${chatId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any) {
    const { chatId, userId, content, fileUrl } = payload;

    // Enviar el mensaje al microservicio de chat
    const message = await this.gatewayService.sendMessage(chatId, userId, content, fileUrl);

    // Emitir el mensaje a todos los usuarios en el chat
    this.server.to(`chat-${chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('loadMessages')
  async handleLoadMessages(client: Socket, payload: { chatId: number }) {
    const messages = await this.gatewayService.getChatMessages(payload.chatId);
    client.emit('chatMessages', messages);
  }
}