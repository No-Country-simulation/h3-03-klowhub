import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { MultimediaDto } from './dto/multimedia.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CloudinaryUploadFailedException,
  CourseCreationFailedException,
  CourseImageSizeFailed,
  CourseVideoSizeFailed,
  createCourseFailed,
  ImageFileMissingException,
  PDF_FileSize,
  VideoFileMissingException,
} from 'src/custom-exceptions/custom-exceptions';
// import { CreateLessonDto } from './dto/lesson.dto';
// import { CreateCourseModuleDto } from './dto/course-module.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post('multimedia')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() multimediaDto: MultimediaDto,
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
      console.log('Datos enviados al servicio:', {
        multimediaDto,
        file,
        fileType,
      }); // Log de los datos antes de enviar al servicio
      return await this.coursesService.create(multimediaDto, file, fileType);
    } catch (error) {
      console.error('Error capturado en catch:', error); // Log del error capturado
      if (error instanceof ImageFileMissingException) {
        throw new BadRequestException('La imagen del curso es requerida');
      }
      if (error instanceof CloudinaryUploadFailedException) {
        throw new BadRequestException(
          'Error de cloudinary al cargar la imagen',
        );
      }
      if (error instanceof CourseCreationFailedException) {
        throw new BadRequestException('Error al crear el curso');
      }
      if (error instanceof CourseImageSizeFailed) {
        throw new BadRequestException(
          'La imagen del curso excede el tamaño máximo permitido de 100 KB',
        );
      }
      if (error instanceof CourseVideoSizeFailed) {
        throw new BadRequestException(
          'El archivo del video excede el máximo permitido de 100 MB',
        );
      }
      if (error instanceof VideoFileMissingException) {
        throw new BadRequestException('El video del curso es requerido');
      }
      if (error instanceof PDF_FileSize) {
        throw new BadRequestException('El pdf no debe ser mayor de 3 MB');
      }
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }

  //Hacer el post de cursos con todas las entidades!!!
  // POST /courses/user/:id -> crea un nuevo curso con el id del usuario

  @Post('user/:userId')
  async createCourse(
    @Param('userId') userId: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    try {
      createCourseDto.userId = userId;
      return await this.coursesService.createCourse(createCourseDto);
    } catch (error) {
      if (error instanceof createCourseFailed) {
        throw new BadRequestException('Failed to create the course');
      }
      throw error;
    }
  }

  // TRAEMOS TODOS LOS CURSOS
  // GET /courses -> trae todos los cursos
  @Get()
  async findAll() {
    try {
      const allCourses = await this.coursesService.findAll();
      if (!allCourses) {
        throw new NotFoundException('No hay cursos disponibles');
      }
      return allCourses;
    } catch (error) {
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }

  //OBTENEMOS UN CURSO PERTENECIENTE A UN USUARIO
  // GET /courses/:id -> trae un curso por id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const userCourse = await this.coursesService.findOneCourse(id);
      return userCourse;
    } catch (error) {
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }
  //OBTENEMOS CURSOS PERTENECIENTES A UN USUARIO
  // GET /courses/user/:id -> trae todos los cursos de un usuario
  @Get('user/:id')
  async findAllWithUser(@Param('id') userId: string) {
    try {
      const findAll = this.coursesService.getAllCoursesByUserId(userId);
      return findAll;
    } catch (error) {
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }

  // PUT /courses/:id -> edita un curso con el id del usuario
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const updateCourse = await this.coursesService.update(id, updateCourseDto);
    if (!updateCourse) {
      throw new NotFoundException('There is no course to update');
    }
    return updateCourse;
  }

  //ELIMINAR UN CURSO
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
