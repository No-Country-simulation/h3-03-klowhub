import { WebSocketGateway, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { ChatService } from "./chat.service";

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService){}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() message: {senderId: string; receiverId: string; content: string}){
    const saveMessage = await this.chatService.saveMessage(message);
    return saveMessage;
  }
}