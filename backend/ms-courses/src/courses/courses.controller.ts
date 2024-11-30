import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { VideoDto } from './dto/video-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  CloudinaryUploadFailedException,
  CourseCreationFailedException,
  CourseImageSizeFailed,
  CourseVideoSizeFailed,
  ImageFileMissingException,
  PDF_FileSize,
  VideoFileMissingException,
} from 'src/custom-exceptions/custom-exceptions';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImg', maxCount: 1 },
      { name: 'modules[0][lessons][0][videos]', maxCount: 1 },
      { name: 'resource', maxCount: 3 },
    ]),
  )
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: {
      coverImg?: Express.Multer.File[];
      modules?: { lessons?: { videos?: Express.Multer.File[] }[] }[];
      resource?: Express.Multer.File[];
    },
  ) {
    console.log('Body recibido:', createCourseDto); // Log del cuerpo recibido
    console.log('Archivos recibidos:', files); // Log de los archivos recibidos
    //const { modules } = createCourseDto;
    // Verifica si coverImg está presente en los archivos
    if (!files.coverImg || files.coverImg.length === 0) {
      console.log('coverImg no encontrado:', files.coverImg); // Si falta la imagen
      throw new BadRequestException('La imagen del curso es requerida');
    }
    const imagenFile = files.coverImg?.[0];
    const videoFile = files['modules[0][lessons][0][videos]']?.[0];
    const documentFile = files.resource?.[0];

    if (!videoFile) {
      console.log(
        'Video no encontrado:',
        files['modules[0][lessons][0][videos]'],
      ); // Si falta el video

      throw new BadRequestException('El video del curso es requerido');
    }

    // Iterar sobre los módulos y lecciones para validar y asignar videos
    // modules.forEach((module, moduleIndex) => {
    //   if (module.lessons) {
    //     module.lessons.forEach((lesson, lessonIndex) => {
    //       const videoFileKey = `modules[${moduleIndex}][lessons][${lessonIndex}][videos]`;
    //       const lessonVideoFile = files[videoFileKey]?.[0];

    //       // Asignar el archivo de video a la lección correspondiente
    //       if (lessonVideoFile) {
    //         lesson.video = lessonVideoFile;
    //       } else {
    //         // Si falta el video en la lección, lanzar un error
    //         throw new BadRequestException(
    //           `El video para la lección "${lesson.title}" es requerido`,
    //         );
    //       }
    //     });
    //   }
    // });

    try {
      console.log('Datos enviados al servicio:', {
        createCourseDto,
        imagenFile,
        videoFile,
        documentFile,
      }); // Log de los datos antes de enviar al servicio
      return await this.coursesService.create(
        createCourseDto,
        imagenFile,
        videoFile,
        documentFile,
      );
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
  //enviar el video unicamente
  @Post('video')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  async createVideo(
    //no se esta usando el body por eso el dto queda como opcional
    @Body() VideoDto: VideoDto,
    @UploadedFiles() files: { video?: Express.Multer.File[] },
  ) {
    const videoFile = files.video?.[0];

    console.log('Received video file:', videoFile);

    if (!videoFile) {
      throw new Error('No video file uploaded.');
    }
    console.log('ERROR', videoFile);
    try {
      return await this.coursesService.createVideo(VideoDto, videoFile);
    } catch (error) {
      console.log(error);
    }
  }
  ///
  @Get('video/:id')
  async findOneVideo(@Param('id') id: string) {
    try {
      const getAsingleVideo = await this.coursesService.findOneVideo(id);
      if (!getAsingleVideo) {
        throw new NotFoundException('There is no video available');
      }
      return getAsingleVideo;
    } catch (error) {
      console.log(error);
    }
  }

  /////////////
  @Get()
  async findAll() {
    const allCourses = await this.coursesService.findAll();
    if (!allCourses) {
      throw new NotFoundException('There are no course available');
    }
    return allCourses;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new BadRequestException('There in no course avaiable');
    }
    const singleCourse = await this.coursesService.findOne(id);
    console.log('este es el singleCourse', singleCourse);
    if (!singleCourse) {
      throw new NotFoundException('There is no a course available');
    }
    return singleCourse;
  }

  @Patch(':id')
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
