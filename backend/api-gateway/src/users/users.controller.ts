import { Controller, Get, Param, Body, Post, BadRequestException} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':id')
  async obtenerUsuario(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://ms-users:3001/users/${id}`), // URL del microservicio de usuarios
    );
    return response.data;
  }

  @Get('')
  async obtenerTodosLosUsuarios() {
    const response = await firstValueFrom(
      this.httpService.get(`http://ms-users:3001/users`),
    );
    return response.data;
  }

  @Post(':id/projects')
  async crearProyecto(@Body() projectData: { [key: string]: any }, @Param('id') userId: string) {
    // Validar que el userId sea válido
    try {
      const userResponse = await firstValueFrom(
        this.httpService.get(`http://ms-users:3001/users/${userId}`),
      );
      if (!userResponse.data) {
        throw new BadRequestException('Usuario no encontrado');
      }
    } catch (error) {
      throw new BadRequestException('Error al validar el usuario');
    }

    // Crear el proyecto en el microservicio de proyectos
    const response = await firstValueFrom(
      this.httpService.post('http://ms-projects:3002/projects', {
        ...projectData,
        userId, // Agregamos el ID del usuario
      }),
    );

    return response.data;
  }

  @Get(':id/projects')
  async getProjectsByUserId(@Param('id') userId: string) {
    if (!userId) {
      throw new BadRequestException('El userId es requerido');
    }

    try {
      // Validar si el usuario existe en el microservicio de usuarios
      const userResponse = await firstValueFrom(
        this.httpService.get(`http://ms-users:3001/users/${userId}`),
      );
      if (!userResponse.data) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // Obtener proyectos del microservicio de proyectos
      const projectsResponse = await firstValueFrom(
        this.httpService.get(`http://ms-projects:3002/projects/user/${userId}`),
      );

      return projectsResponse.data;
    } catch (error) {
      throw new BadRequestException('Error al buscar proyectos para el usuario');
    }
  }

}
