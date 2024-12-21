import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}