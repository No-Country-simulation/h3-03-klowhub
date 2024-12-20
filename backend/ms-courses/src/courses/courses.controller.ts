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

  //LAS TRES RUTAS INDIVIDUALES SON DE ABAJO TESTEO PARA CHEQUEAR QUE SE GUARDEN EN SUS TABLAS()
  //Creamos solamente un curso
  // @Post('createCourse')
  // async createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   try {
  //     return await this.coursesService.createCourse(createCourseDto);
  //   } catch (error) {
  //     if (error instanceof createCourseFailed) {
  //       throw new BadRequestException('Failed to create the course');
  //     }
  //     throw error;
  //   }
  // }

  // //Creamos solamente una lección
  // @Post('createLesson')
  // async createLesson(@Body() createLessonDto: CreateLessonDto) {
  //   try {
  //     return await this.coursesService.createLesson(createLessonDto);
  //   } catch (error) {
  //     if (error instanceof createCourseFailed) {
  //       throw new BadRequestException('Failed to create the lesson');
  //     }
  //     throw error;
  //   }
  // }

  // //Creamos solamente un modulo
  // @Post('createModule')
  // async createModule(@Body() createCourseModuleDto: CreateCourseModuleDto) {
  //   try {
  //     return await this.coursesService.createModulos(createCourseModuleDto);
  //   } catch (error) {
  //     if (error instanceof createCourseFailed) {
  //       throw new BadRequestException('Failed to create the course');
  //     }
  //     throw error;
  //   }
  // }
  ///////////////////////////////////////////////////////////////////////////////////////////
  //Post de la imagen
  // @Post('image')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  // async createImage(@UploadedFiles() files: { image?: Express.Multer.File[] }) {
  //   console.log('Files received:', files);
  //   const imageFile = files.image?.[0];
  //   try {
  //     return await this.coursesService.createImage(imageFile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //enviar el video unicamente
  // @Post('video')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  // async createVideo(
  //   //no se esta usando el body por eso el dto queda como opcional
  //   @Body() VideoDto: VideoDto,
  //   @UploadedFiles() files: { video?: Express.Multer.File[] },
  // ) {
  //   const videoFile = files.video?.[0];
  //   console.log('Received video file:', videoFile);

  //   if (!videoFile) {
  //     throw new Error('No video file uploaded.');
  //   }
  //   console.log('ERROR', videoFile);
  //   try {
  //     return await this.coursesService.createVideo(VideoDto, videoFile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  ///
  // @Get('video/:id')
  // async findOneVideo(@Param('id') id: string) {
  //   try {
  //     const getAsingleVideo = await this.coursesService.findOneVideo(id);
  //     if (!getAsingleVideo) {
  //       throw new NotFoundException('There is no video available');
  //     }
  //     return getAsingleVideo;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // TRAEMOS TODOS LOS CURSOS
  @Get('all')
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

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: string,
  //   @Query('withAuthor') withAuthor?: string,
  // ) {
  //   const isWithAuthor = withAuthor === 'true';
  //   return this.coursesService.findOneCourse(id, isWithAuthor);
  // }

  //OBTENEMOS LOS CURSOS DE UN USUARIO
  @Get('user/:userId')
  async findOneByUserId(@Param('userId') userId: string): Promise<any> {
    try {
      const userCourse = await this.coursesService.getAllCoursesWithUsers(userId);
      return userCourse;
    } catch (error) {
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }
  
  //OBTENEMOS UN CURSO POR ID
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
  @Get()
  async findAllWithUser() {
    try {
      const findAll = this.coursesService.getAllCoursesWithUsers();
      return findAll;
    } catch (error) {
      throw new BadRequestException(
        `An unexpected error occured: ${error.message}`,
      );
    }
  }

  //esta es la siguiente ruta a completar
  // @Get('user/:userId')
  // async getAllCoursesByUserId(@Param('userId') userId: string) {
  //   if (!userId) {
  //     throw new BadRequestException('El userId es requerido');
  //   }
  //   //const courses = await this.coursesService.getAllCoursesByUserId(userId);
  //   if (!courses || courses.length === 0) {
  //     throw new BadRequestException(
  //       `No se encontraron proyectos para el usuario con ID ${userId}`,
  //     );
  //   }
  //   return courses;
  // }

  //cambiar a put
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
