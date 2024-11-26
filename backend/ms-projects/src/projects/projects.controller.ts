import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException  } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity/project.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateProjectDto } from './dto/create-project.dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly httpService: HttpService
  ){}

  @Post()
  async createProject(@Body() projectData: CreateProjectDto) {
    const { userId } = projectData; // Extraer userId del cuerpo de la solicitud

    if (!userId) {
      throw new BadRequestException('El userId es requerido para crear un proyecto');
    }

    // Validar que el usuario existe en el microservicio de usuarios
    try {
      const userResponse = await firstValueFrom(
        this.httpService.get(`http://ms-users:3001/users/${userId}`),
      );

      if (!userResponse.data) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // Crear el proyecto con el userId
      return this.projectsService.createProject(projectData, userId);
    } catch (error) {
      throw new BadRequestException('Error al validar el usuario');
    }
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Project>) {
    return this.projectsService.updateProject(id, data);
  }


  @Get(':userId')
  async getProjectsByUserId(@Param('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('El userId es requerido');
    }

    // Llamar al servicio para buscar proyectos por userId
    const projects = await this.projectsService.getProjectsByUserId(userId);

    if (!projects || projects.length === 0) {
      throw new BadRequestException(`No se encontraron proyectos para el usuario con ID ${userId}`);
    }

    return projects;
  }

  @Get()
  findAll() {
    return this.projectsService.getAllProjects();
  }
}