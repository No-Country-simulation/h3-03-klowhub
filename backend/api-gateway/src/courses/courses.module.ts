import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [],
  imports: [HttpModule],
})
export class CourseModule {}
