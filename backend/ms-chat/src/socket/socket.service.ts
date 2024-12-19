import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { Server, Socket } from "socket.io";
import { SubscribeMessage, WebSocketServer } from "@nestjs/websockets";


@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
    server: Server;

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('clientMessage1', (value) => {
      console.log(value);
      socket.emit("serverResponse1", value)
    });

    socket.on('disconnect', () => {
      console.log("desconectado")
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }

    // @SubscribeMessage('clientMessage')
    // async handleMessage(client: Socket, payload: any): Promise<void> {
    //   const { chatId, userId, content, fileUrl } = payload;
    //   const message = await this.chatService.sendMessage(chatId, userId, content, fileUrl);
    //   this.server.to(`chat-${chatId}`).emit('serverResponse', message);
    // }
  
    // @SubscribeMessage('joinChat')
    // handleJoinChat(client: Socket, chatId: number): void {
    //   client.join(`chat-${chatId}`);
    // }
  
    // @SubscribeMessage('loadMessages')
    // async handleLoadMessages(client: Socket, chatId: number): Promise<void> {
    //   try {
    //     const messages = await this.chatService.getMessages(chatId);
    //     client.emit('messagesLoaded', messages);
    //   } catch (error) {
    //     client.emit('error', { message: 'Error loading messages', details: error.message });
    //   }
    // }
  // Add more methods for handling events, messages, etc.
}