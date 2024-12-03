import { Injectable } from '@nestjs/common';
// import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  CloudinaryUploadFailedException,
  CourseCreationFailedException,
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
    imagenFile: Express.Multer.File,
    videoFile: Express.Multer.File,
    documentFiles: Express.Multer.File,
  ): Promise<Multimedia> {
    this.validateFile(imagenFile, this.MAX_IMAGE_SIZE, 'image');
    const uploadImage = await this.cloudinaryService.uploadFile(imagenFile);
    console.log('Resultado de carga de imagen:', uploadImage);
    if (!uploadImage || !uploadImage.secure_url) {
      throw new CloudinaryUploadFailedException();
    }

    multimediaDto.coverImg = {
      url: uploadImage.secure_url,
      size: uploadImage.bytes,
      width: uploadImage.width,
      height: uploadImage.height,
      format: uploadImage.format,
      mimeType: imagenFile.mimetype,
      created_at: uploadImage.created_at,
    };

    this.validateFile(videoFile, this.MAX_VIDEO_SIZE, 'video');

    const uploadVideo = await this.cloudinaryService.uploadFile(videoFile);
    console.log('Resultado de carga de video:', uploadVideo);
    if (!uploadVideo || !uploadVideo.secure_url) {
      throw new CloudinaryUploadFailedException();
    }
    multimediaDto.video = {
      url: uploadVideo.secure_url,
      duration: uploadVideo.duration,
      size: uploadVideo.bytes,
      resolution: uploadVideo.resolution,
      format: uploadVideo.format,
      width: uploadVideo.width,
      height: uploadVideo.height,
      mimeType: videoFile.mimetype,
      thumbnail_url: uploadVideo.thumbnailUrl,
      thumbnail_width: uploadVideo.thumbnailUrl_width,
      thumbnail_height: uploadVideo.thumbnailUrl_height,
      created_at: uploadImage.created_at,
    };

    if (documentFiles) {
      this.validateFile(documentFiles, this.MAX_PDF_SIZE, 'pdf');
      const uploadDocument =
        await this.cloudinaryService.uploadFile(documentFiles);
      if (!uploadDocument || !uploadDocument.secure_url) {
        throw new CloudinaryUploadFailedException();
      }

      const pdfData = {
        url: uploadDocument.secure_url,
        size: uploadDocument.bytes,
        mimeType: documentFiles.mimetype,
        created_at: uploadDocument.created_at,
      };
      console.log('Esto es el resultado de pdfData', pdfData);
      multimediaDto.documents = multimediaDto.documents || [];
      multimediaDto.documents.push(pdfData);
      // createCourseDto.resource = createCourseDto.resource || [];
      // createCourseDto.resource.push(pdfData);
    }

    const multimedia = this.multimediaRepository.create(multimediaDto);
    const savedMultimedia = await this.multimediaRepository.save(multimedia);

    if (!savedMultimedia) {
      throw new CourseCreationFailedException();
    }
    return savedMultimedia;
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
