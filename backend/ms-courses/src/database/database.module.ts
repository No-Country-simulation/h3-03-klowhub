import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { Course } from 'src/courses/entities/course.entity';
import { Video } from 'src/courses/entities/video.entity';
import { CourseModule } from 'src/courses/entities/course-module.entity';
import { Lesson } from 'src/courses/entities/lesson.entity';
import { Documents } from 'src/courses/entities/document.entity';
import { Module } from '@nestjs/common';
import { Thumbnail } from 'src/courses/entities/thumbnail_url.entity';
import { Image } from 'src/courses/entities/image.entity';
import { Multimedia } from 'src/courses/entities/multimedia.entity';
import { PromotionProduct } from 'src/courses/entities/promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbDatabaseName,
      entities: [
        Course,
        Video,
        Image,
        CourseModule,
        Lesson,
        Documents,
        Thumbnail,
        Multimedia,
        PromotionProduct,
      ],
      synchronize: true,
      // ssl: false,
      // logging: true,
    }),
  ],
})
export class DataCourseModule {}
