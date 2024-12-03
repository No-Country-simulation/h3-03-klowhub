import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envs } from "src/config";
import { Message } from "src/chat/message.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: '',
      host: envs.dbHost, // Cambia esto si es necesario
      port: envs.dbPort,
      username: envs.dbUsername, // Cambia a tu usuario de PostgreSQL
      password: envs.dbPassword, // Cambia a tu contraseña de PostgreSQL
      database: envs.dbDatabaseName, // Nombre de tu base de datos
      entities: [Message],
      synchronize: true, // No usar en producción
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
})
export class DatabaseModule {}
