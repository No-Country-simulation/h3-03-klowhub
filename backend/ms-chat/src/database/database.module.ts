import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envs } from "src/config";
import { Message } from "src/chat/entities/message.entity";
import { Chat } from "src/chat/entities/chat.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: '',
      host: envs.dbHost, 
      port: envs.dbPort,
      username: envs.dbUsername, 
      password: envs.dbPassword,
      database: envs.dbDatabaseName, 
      entities: [Message, Chat],
      synchronize: true, // No usar en producción
      logging: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }),
  ],
})
export class DatabaseModule {}
