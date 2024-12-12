import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { Course } from 'src/courses/entities/course.entity';
import { CourseModule } from 'src/courses/entities/course-module.entity';
import { Lesson } from 'src/courses/entities/lesson.entity';
import { Module } from '@nestjs/common';
import { Multimedia } from 'src/courses/entities/multimedia.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbDatabaseName,
      entities: [Course, CourseModule, Lesson, Multimedia],
      synchronize: true,
      // ssl: false,
      // logging: true,
    }),
  ],
})
export class DataCourseModule {}
