import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
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

import { Video } from './entities/video.entity';
import { VideoDto } from './dto/video-course.dto';
import { Image } from './entities/image.entity';
import { Thumbnail } from './entities/thumbnail_url.entity';
import { Multimedia } from './entities/multimedia.entity';
import { MultimediaDto } from './dto/multimedia.dto';

@Injectable()
export class CoursesService {
  private readonly MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
  private readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly MAX_PDF_SIZE = 3 * 1024 * 1024; // 3 MB

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,

    @InjectRepository(Thumbnail)
    private readonly thumbnailRepository: Repository<Thumbnail>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @InjectRepository(Multimedia)
    private readonly multimediaRepository: Repository<Multimedia>,
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
      multimediaDto.fileMetadata = {
        url: uploadResult.secure_url,
        duration: uploadResult.duration,
        size: uploadResult.bytes,
        resolution: uploadResult.resolution,
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

  //entidad de imagen
  async createImage(imageFile: Express.Multer.File): Promise<Image> {
    const uploadImage = await this.cloudinaryService.uploadFile(imageFile);
    const imageData = {
      url: uploadImage.secure_url,
      size: uploadImage.bytes,
      width: uploadImage.width,
      height: uploadImage.height,
      format: uploadImage.format,
      created_at: uploadImage.created_at,
    };
    const imagen = await this.imageRepository.save(imageData);
    console.log('video creado', imagen);

    return imagen;
  }
  //entidad de Video
  async createVideo(
    VideoDto: VideoDto,
    videoFile: Express.Multer.File,
  ): Promise<Video> {
    const uploadVideo = await this.cloudinaryService.uploadFile(videoFile);
    console.log('UPLOAD VIDEO', uploadVideo);
    const videoData = {
      url: uploadVideo.secure_url,
      duration: uploadVideo.duration,
      size: uploadVideo.bytes,
      format: uploadVideo.format,
      width: uploadVideo.width,
      height: uploadVideo.height,
      thumbnail_url: uploadVideo.thumbnailUrl,
      thumbnail_width: uploadVideo.thumbnailUrl_width,
      thumbnail_height: uploadVideo.thumbnailUrl_height,
      created_at: new Date(uploadVideo.created_at),
    };

    const video = this.videoRepository.create(videoData);
    const savedVideo = await this.videoRepository.save(video);
    console.log('video creado', video);
    console.log('Video guardado:', savedVideo);

    const imagenData = {
      thumbnail_url: uploadVideo.thumbnailUrl,
      video: savedVideo,
    };
    const imagen = this.thumbnailRepository.create(imagenData);
    const savedImagen = this.thumbnailRepository.save(imagen);
    console.log('imagen guardada:', savedImagen);

    return savedVideo;
    // return this.videoRepository.save(video);
  }
  async findOneVideo(id: string) {
    const video = await this.videoRepository.findOne({
      where: { id },
      // relations: ['thumbnail_url'],
    });
    if (!video) {
      return null;
    }
    return video;
  }

  async findAll(): Promise<Course[]> {
    const course = await this.courseRepository.find({
      where: { available: true },
    });
    return course;
  }

  async findOne(id: string): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id },
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
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Course | null> {
    const course = await this.findOne(id);
    if (!course) {
      return null;
    }
    course.available = false;
    await this.courseRepository.save(course);
    return course;
  }
}
