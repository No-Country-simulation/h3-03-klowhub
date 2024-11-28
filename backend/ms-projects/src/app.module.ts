import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProjectsModule, DatabaseModule],
})
export class AppModule {}

