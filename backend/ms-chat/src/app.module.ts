import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [ChatModule, DatabaseModule, SocketModule],
})
export class AppModule {}