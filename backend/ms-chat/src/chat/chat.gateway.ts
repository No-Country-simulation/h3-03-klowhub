// import { WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
// import { ChatService } from "./chat.service";
// import { Server, Socket } from "socket.io";

// @WebSocketGateway({ namespace: '/chat', cors: true })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private chatService: ChatService) {}

//   @SubscribeMessage('sendMessage')
//   async handleMessage(client: Socket, payload: any): Promise<void> {
//     const { chatId, userId, content, fileUrl } = payload;
//     const message = await this.chatService.sendMessage(chatId, userId, content, fileUrl);
//     this.server.to(`chat-${chatId}`).emit('newMessage', message);
//   }

//   @SubscribeMessage('joinChat')
//   handleJoinChat(client: Socket, chatId: number): void {
//     client.join(`chat-${chatId}`);
//   }

//   @SubscribeMessage('loadMessages')
//   async handleLoadMessages(client: Socket, chatId: number): Promise<void> {
//     try {
//       const messages = await this.chatService.getMessages(chatId);
//       client.emit('messagesLoaded', messages);
//     } catch (error) {
//       client.emit('error', { message: 'Error loading messages', details: error.message });
//     }
//   }
// }

import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable() 
@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Método para manejar conexiones
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Método para manejar desconexiones
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Evento para unirse a un chat
  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, chatId: number): Promise<void> {
    client.join(`chat-${chatId}`);
    console.log(`Client ${client.id} joined chat-${chatId}`);
  }

  // Evento para enviar mensajes
  @SubscribeMessage('clientMessage')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { chatId, userId, content, fileUrl, emotes } = payload;
    console.log('AAAAAAAAAa');

    try {
      const message = await this.chatService.createMessage(chatId, { userId, content, fileUrl, emotes });
      this.server.to(`chat-${chatId}`).emit('serverResponse', message);
    } catch (error) {
      client.emit('error', { message: 'Error sending message', details: error.message });
    }
  }

  // Evento para cargar mensajes de un chat
  @SubscribeMessage('loadMessages')
  async handleLoadMessages(client: Socket, chatId: string): Promise<void> {
    try {
      const messages = await this.chatService.getChatMessages(chatId);
      client.emit('messagesLoaded', messages);
    } catch (error) {
      client.emit('error', {
        message: 'Error loading messages',
        details: error.message,
      });
    }
  }

  // Evento para agregar un miembro a un chat grupal
  @SubscribeMessage('addMemberToGroup')
  async handleAddMemberToGroup(
    client: Socket,
    payload: { chatId: number; userId: number }
  ): Promise<void> {
    const { chatId, userId } = payload;

    try {
      await this.chatService.addMembersToGroupChat(chatId, { members: [userId.toString()] });
      this.server.to(`chat-${chatId}`).emit('memberAdded', { chatId, userId });
    } catch (error) {
      client.emit('error', {
        message: 'Error adding member to group chat',
        details: error.message,
      });
    }
  }

  // Notificación de usuarios conectados en un chat (opcional)
  @SubscribeMessage('notifyConnectedUsers')
  async handleNotifyConnectedUsers(client: Socket, chatId: number): Promise<void> {
    const connectedUsers = Array.from(
      this.server.sockets.adapter.rooms.get(`chat-${chatId}`) || []
    );
    this.server.to(`chat-${chatId}`).emit('connectedUsers', connectedUsers);
  }
}

