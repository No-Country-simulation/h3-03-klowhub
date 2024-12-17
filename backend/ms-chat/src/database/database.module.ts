import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envs } from "src/config";
import { Message } from "src/chat/entities/message.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: '',
      host: envs.dbHost || 'db', // Cambia esto si es necesario
      port: envs.dbPort || 5432,
      username: envs.dbUsername || 'root', // Cambia a tu usuario de PostgreSQL
      password: envs.dbPassword || 'root', // Cambia a tu contraseña de PostgreSQL
      database: envs.dbDatabaseName || 'klowhub', // Nombre de tu base de datos
      entities: [Message],
      synchronize: true, // No usar en producción
      logging: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }),
  ],
})
export class DatabaseModule {}
