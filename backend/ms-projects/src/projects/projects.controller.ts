import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, UseInterceptors,
  UploadedFile,
  Query, NotFoundException  } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity/project.entity';
import { firstValueFrom, NotFoundError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateProjectDto } from './dto/create-project.dto/create-project.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {CreateAssetDto} from './dto/asset-proyect.dto/create-asset-dto'

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly httpService: HttpService
  ){}

    //MULTIMEDIA ROUTES
    @Post('multimedia')
    @UseInterceptors(FileInterceptor('file'))
    async createAsset(
      @Body() createAssetDto: CreateAssetDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new BadRequestException('El archivo es requerido');
      }
      let fileType: string;
      if (file.mimetype.startsWith('image/')) {
        fileType = 'image';
      } else if (file.mimetype.startsWith('video/')) {
        fileType = 'video';
      } else if (file.mimetype.startsWith('application/pdf')) {
        fileType = 'document';
      } else {
        throw new BadRequestException('Tipo de archivo no soportado');
      }
      try {
        return await this.projectsService.createAssets(createAssetDto, file, fileType);
      } catch (error) {
        console.error('Error capturado en catch:', error); // Log del error capturado
      }
    }



    @Post('user/:userId')
    @ApiOperation({ summary: 'Crear un nuevo proyecto' })
    @ApiResponse({
      status: 201,
      description: 'El proyecto ha sido creado exitosamente.',
    })
    @ApiResponse({
      status: 400,
      description: 'Error al crear el proyecto o usuario no encontrado.',
    })
    @ApiParam({ name: 'userId', description: 'ID del usuario asociado', type: String })
    async createProject(
      @Param('userId') userId: string,
      @Body() projectData: CreateProjectDto,
    ) {
      // Crear el proyecto
      try {
        const newProject = await this.projectsService.createProject(projectData, userId);

        const response = {
          ...newProject,
          authorId: newProject.userId, // Nuevo campo
        };
        delete response.userId; // Eliminar el campo original
    


        return response;
      } catch (error) {
        throw new BadRequestException(`Error al crear el proyecto: ${error.message}`);
      }
    }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({
    status: 200,
    description: 'El proyecto ha sido eliminado con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'El proyecto no fue encontrado.',
  })
  @ApiParam({ name: 'id', description: 'ID del proyecto a eliminar', type: Number })
  delete(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }




  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiResponse({
    status: 200,
    description: 'El proyecto ha sido actualizado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'El proyecto no fue encontrado.',
  })
  @ApiParam({ name: 'id', description: 'ID del proyecto a actualizar', type: Number })
  @ApiBody({ description: 'Datos para actualizar el proyecto'})
  update(@Param('id') id: string, @Body() data: Partial<Project>) {
    return this.projectsService.updateProject(id, data);
  }




  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener proyectos por ID de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Proyectos encontrados para el usuario especificado.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron proyectos para el usuario especificado.',
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: String })
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

  @Get(':id')
  @ApiOperation({ summary: 'Lista un proyecto en especifico con informacion de los autores'})
  @ApiResponse({
    status: 200,
    description: 'Proyectos encontrados con los authores',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron proyectos',
  })
  async getProjectByIdWithUser(@Param('id') id: string): Promise<any> {
    return this.projectsService.findOneByIdWithUser(id);

  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos con información de los autores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proyectos con información de autores obtenida exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron proyectos.',
  })
  async findAllWithUsers() {
    try {
      return this.projectsService.getAllProjectsWithUsers();
    } catch (err) {
      throw new NotFoundException("No se encontró ningún proyecto")
    }
  }

}
