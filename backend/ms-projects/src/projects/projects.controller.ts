import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity/project.entity';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService){}

  @Post()
  create(@Body() data: Partial<Project>) {
    return this.projectsService.createProject(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Project>) {
    return this.projectsService.updateProject(id, data);
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.projectsService.getProjectById(id);
  // }

  @Get()
  findAll() {
    return this.projectsService.getAllProjects();
  }
}