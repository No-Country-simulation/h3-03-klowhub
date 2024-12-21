import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { In, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  CloudinaryUploadFailedException,
  // CourseCreationFailedException,
  CourseImageSizeFailed,
  CourseVideoSizeFailed,
  ImageFileMissingException,
  PDF_FileSize,
  VideoFileMissingException,
} from 'src/custom-exceptions/custom-exceptions';

import { Multimedia } from './entities/multimedia.entity';
import { MultimediaDto } from './dto/multimedia.dto';
import { CourseModule } from './entities/course-module.entity';
import { Lesson } from './entities/lesson.entity';
import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
dotenv.config();

import { envs } from 'src/config';
import { lastValueFrom } from 'rxjs';
// import { firstValueFrom } from 'rxjs';

// import { CreateLessonDto } from './dto/lesson.dto';
// import { CreateCourseModuleDto } from './dto/course-module.dto';

@Injectable()
export class CoursesService {
  private readonly MAX_IMAGE_SIZE = 10000 * 1024; // 10 MB
  private readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly MAX_PDF_SIZE = 3 * 1024 * 1024; // 3 MB

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly httpService: HttpService,
    @InjectRepository(Multimedia)
    private readonly multimediaRepository: Repository<Multimedia>,

    @InjectRepository(CourseModule)
    private readonly courseModuleRepository: Repository<CourseModule>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    // @InjectRepository(Document)
    // private readonly documentRepository: Repository<Document>,
  ) {}

  private validateFile(
    file: Express.Multer.File,
    maxSize: number,
    fileType: string,
  ): void {
    if (!file) {
      throw fileType === 'image'
        ? new ImageFileMissingException()
        : new VideoFileMissingException();
    }
    if (file.size > maxSize) {
      throw fileType === 'image'
        ? new CourseImageSizeFailed()
        : fileType === 'video'
          ? new CourseVideoSizeFailed()
          : new PDF_FileSize();
    }
  }

  async create(
    multimediaDto: MultimediaDto,
    file: Express.Multer.File,
    fileType: string,
  ): Promise<Multimedia> {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    const isPdf = file.mimetype.startsWith('application/pdf');

    if (isImage) {
      this.validateFile(file, this.MAX_IMAGE_SIZE, 'image');
    } else if (isVideo) {
      this.validateFile(file, this.MAX_VIDEO_SIZE, 'video');
    } else if (isPdf) {
      this.validateFile(file, this.MAX_PDF_SIZE, 'pdf');
    } else {
      throw new BadRequestException('Tipo de archivo no soportado');
    }
    // Subir el archivo a Cloudinary con las opciones adecuadas
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    if (!uploadResult || !uploadResult.secure_url) {
      throw new CloudinaryUploadFailedException();
    }
    if (fileType === 'image') {
      multimediaDto.fileMetadata = {
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        mimeType: file.mimetype,
        created_at: uploadResult.created_at,
      };
      multimediaDto.fileType = 'image';
    } else if (fileType === 'video') {
      const resolution = `${uploadResult.width}x${uploadResult.height}`; // Cálculo de resolución
      multimediaDto.fileMetadata = {
        url: uploadResult.secure_url,
        duration: uploadResult.duration,
        size: uploadResult.bytes,
        resolution: resolution,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        mimeType: file.mimetype,
        thumbnailUrl: uploadResult.thumbnailUrl,
        thumbnailWidth: uploadResult.thumbnailWidth,
        thumbnailHeight: uploadResult.thumbnailHeight,
        created_at: uploadResult.created_at,
      };
      multimediaDto.fileType = 'video';
    } else if (fileType === 'document') {
      // multimediaDto.fileMetadata = multimediaDto.fileMetadata || [];
      multimediaDto.fileMetadata = {
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        mimeType: file.mimetype,
        filename: uploadResult.filename,
        created_at: uploadResult.created_at,
      };
      multimediaDto.fileType = 'document';
    } else {
      throw new BadRequestException('Tipo de archivo no soportado');
    }

    // Guarda los datos en la base de datos
    const multimedia = this.multimediaRepository.create(multimediaDto);
    console.log('fileType antes de la inserción:', multimediaDto.fileType);
    return await this.multimediaRepository.save(multimedia);
    // const course = this.courseRepository.create({
    //   multimedia: [savedMultimedia],
    // });
    // const savedCourse = await this.courseRepository.save(course);
    // if (!savedCourse) {
    //   throw new CourseCreationFailedException();
    // }
    // return savedCourse;
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const {
      title,
      freeCourse,
      contentType,
      shortDescription,
      courseDifficulty,
      platform,
      language,
      modules,
      // multimedia,
      coverImg,
      promotionalVideo: promotionalVideo,
      ...rest
    } = createCourseDto;

    console.log('CoverImg DTO:', coverImg);

    // Manejar la portada
    let coverImgEntity: Multimedia | null = null;

    if (coverImg) {
      // Verifica si coverImg es un string (ID)
      const coverImgId = typeof coverImg === 'string' ? coverImg : coverImg.id;

      if (!coverImgId) {
        throw new Error('Cover image ID is required.');
      }

      coverImgEntity = await this.multimediaRepository.findOne({
        where: { id: coverImgId },
      });

      if (!coverImgEntity) {
        throw new Error(
          `Cover image with ID ${coverImgId} not found. Please provide a valid ID.`,
        );
      }
    }

    // Manejar el video promocional
    let promotionalVideoEntity: Multimedia | null = null;
    if (promotionalVideo) {
      const promoVideoId =
        typeof promotionalVideo === 'string'
          ? promotionalVideo
          : promotionalVideo.id;

      if (!promoVideoId) {
        throw new Error('Promotional video ID is required.');
      }

      promotionalVideoEntity = await this.multimediaRepository.findOne({
        where: { id: promoVideoId },
      });

      if (!promotionalVideoEntity) {
        throw new Error(`Promotional video with ID ${promoVideoId} not found.`);
      }
    }

    // Crear un nuevo curso
    const course = this.courseRepository.create({
      title,
      freeCourse,
      contentType,
      shortDescription,
      courseDifficulty,
      platform,
      language,
      ...rest,
      modules:
        modules?.map((module) => this.courseModuleRepository.create(module)) ||
        [],
      // multimedia:
      //   multimedia?.map((media) => this.multimediaRepository.create(media)) ||
      //   [],
      coverImg: coverImgEntity,
      promotionalVideo: promotionalVideoEntity,
    });

    // Verificar el curso antes de guardar
    // console.log('Course before saving:', course);
    console.log('Course before saving:', JSON.stringify(course, null, 2)); // Esto debería mostrar el contenido completo.

    try {
      return await this.courseRepository.save(course);
    } catch (error) {
      console.error('Error saving course:', error);
      throw new Error('Failed to create the course');
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const courses = await this.courseRepository.find({
        relations: [
          'modules',
          'modules.lessons',
          'coverImg',
          'promotionalVideo',
        ],
      });

      if (!courses || courses.length === 0) {
        throw new NotFoundException('No hay cursos disponibles.');
      }

      const enrichedCourses = await Promise.all(
        courses.map(async (course) => {
          try {
            const { data: author } = await this.httpService
              .get(`${envs.msUsersEndpoint}/${course.userId}`)
              .toPromise();
            return {
              ...course,
              author, // Agregamos la propiedad author
            };
          } catch (error) {
            console.error(
              `Error fetching author for course ${course.id}:`,
              error.message,
            );
            return {
              ...course,
              author: null, // Valor predeterminado si falla la consulta
            };
          }
        }),
      );

      return enrichedCourses;
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      throw new InternalServerErrorException('Error retrieving courses.');
    }
  }

  async findOneCourse(id: string): Promise<any> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['modules', 'modules.lessons', 'coverImg', 'promotionalVideo'],
    });
    if (!course) {
      throw new NotFoundException(`course with ID ${id} not found`);
    }
    const requestUrl = `${envs.msUsersEndpoint}/${course.userId}`;

    try {
      const userResponse = await lastValueFrom(
        this.httpService.get(requestUrl),
      );
      return {
        ...course,
        author: userResponse.data,
      };
    } catch (error) {
      console.error(
        'Error in request:',
        error.response ? error.response.data : error.message,
      );
      throw new NotFoundException(`User not found for ID ${course.userId}`);
    }
  }

  async getAllCoursesByUserId(userId: string) {
    try {
      const courses = await this.courseRepository.find({
        where: { userId },
        relations: [
          'modules',
          'modules.lessons',
          'coverImg',
          'promotionalVideo',
        ],
      });

      if (!courses || courses.length === 0) {
        throw new NotFoundException('No se econtraron proyectos.');
      }

      const proms = courses.map(async (course) => {
        const { data: author } = await this.httpService
          .get(`${envs.msUsersEndpoint}/${course.userId}`)
          .toPromise();
        return {
          ...course,
          author,
        };
      });

      const courseWithAuthors = await Promise.all(proms);
      return courseWithAuthors;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['modules', 'modules.lessons', 'coverImg', 'promo'],
    });
    console.log('Course found:', course);
    if (!course) {
      return null;
    }

    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    const course = await this.findOne(id);
    if (!course) {
      return null;
    }
    // Actualizar los campos del curso en memoria
    Object.assign(course, updateCourseDto); // Aplicar los cambios del DTO

    // Guardar el curso actualizado en la base de datos
    await this.courseRepository.save(course); // Esto actualizará y validará

    return course; // Retornar el curso actualizado
    // await this.courseRepository.update(id, updateCourseDto);
    // return this.findOne(id);
  }

  //   //ELIMINAR UN CURSO
  async remove(id: string): Promise<Course | null> {
    const course = await this.findOne(id);
    if (!course) {
      return null;
    }

    // Eliminar las lecciones asociadas a los módulos del curso
    await this.lessonRepository.delete({
      module: In(course.modules.map((module) => module.id)),
    });

    // Eliminar los módulos relacionados con el curso
    await this.courseModuleRepository.delete({ course });

    // Eliminar el curso
    await this.courseRepository.delete(id);

    return null; // Devolver el curso eliminado
  }
}
