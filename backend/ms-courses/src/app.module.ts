import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DataCourseModule } from './database/database.module';

@Module({
  imports: [CoursesModule, DataCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
