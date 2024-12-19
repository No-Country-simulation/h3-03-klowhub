import { WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { chatId, userId, content, fileUrl } = payload;
    const message = await this.chatService.sendMessage(chatId, userId, content, fileUrl);
    this.server.to(`chat-${chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: number): void {
    client.join(`chat-${chatId}`);
  }

  @SubscribeMessage('loadMessages')
  async handleLoadMessages(client: Socket, chatId: number): Promise<void> {
    try {
      const messages = await this.chatService.getMessages(chatId);
      client.emit('messagesLoaded', messages);
    } catch (error) {
      client.emit('error', { message: 'Error loading messages', details: error.message });
    }
  }
}