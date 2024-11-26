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
      { name: 'imagenDePortada', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'materialAdicional', maxCount: 3 },
    ]),
  )
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: {
      imagenDePortada?: Express.Multer.File[];
      video?: Express.Multer.File[];
      materialAdicional?: Express.Multer.File[];
    },
  ) {
    const imagenFile = files.imagenDePortada?.[0];
    const videoFile = files.video?.[0];
    const documentFile = files.materialAdicional?.[0];
    try {
      return await this.coursesService.create(
        createCourseDto,
        imagenFile,
        videoFile,
        documentFile,
      );
    } catch (error) {
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
