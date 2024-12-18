import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envs } from "src/config";
import { Application } from "src/projects/entities/application.entity/application.entity";
import { Project } from "src/projects/entities/project.entity/project.entity";
import { Asset } from "src/projects/entities/asset.entity/asset.entity";

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
      entities: [Application, Project, Asset], // Lista de entidades que usarás
      synchronize: true, // No usar en producción
      logging: true,
      // dropSchema: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }),
  ],
})
export class DatabaseModule {}
