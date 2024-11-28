import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ChatModule, DatabaseModule],
})
export class AppModule {}