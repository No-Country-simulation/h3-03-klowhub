import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity'; // Asegúrate de importar tus entidades
import { Project } from '../projects/entities/project.entity'; // Importa otras entidades necesarias
import { Course } from '../courses/entities/course.entity'; // Si usas MongoDB o cualquier otra entidad

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto si es necesario
      port: 5432,
      username: 'root', // Cambia a tu usuario de PostgreSQL
      password: 'root', // Cambia a tu contraseña de PostgreSQL
      database: 'klowhub', // Nombre de tu base de datos
      entities: [User, Project, Course], // Lista de entidades que usarás
      synchronize: true, // No usar en producción
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
