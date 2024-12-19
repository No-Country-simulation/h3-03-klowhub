import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity/project.entity';
import { Application } from './entities/application.entity/application.entity';
import { HttpModule } from '@nestjs/axios';
import { Asset } from './entities/asset.entity/asset.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [TypeOrmModule.forFeature([Project, Application, Asset]), CloudinaryModule, HttpModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
