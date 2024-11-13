import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ApplicationsModule } from './applications/applications.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UsersModule, CoursesModule, ApplicationsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
