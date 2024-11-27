import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
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

@Injectable()
export class CoursesService {
  private readonly MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
  private readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly MAX_PDF_SIZE = 3 * 1024 * 1024; // 3 MB

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly cloudinaryService: CloudinaryService,
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
    createCourseDto: CreateCourseDto,
    imagenFile: Express.Multer.File,
    videoFile: Express.Multer.File,
    documentFiles: Express.Multer.File,
  ): Promise<Course> {
    this.validateFile(imagenFile, this.MAX_IMAGE_SIZE, 'image');
    const uploadImage = await this.cloudinaryService.uploadFile(imagenFile);
    console.log('Resultado de carga de imagen:', uploadImage);
    if (!uploadImage || !uploadImage.secure_url) {
      throw new CloudinaryUploadFailedException();
    }
    createCourseDto.coverImg = {
      url: uploadImage.secure_url,
      size: uploadImage.bytes,
      width: uploadImage.width,
      height: uploadImage.height,
      format: uploadImage.format,
      created_at: uploadImage.created_at,
    };

    this.validateFile(videoFile, this.MAX_VIDEO_SIZE, 'video');

    const uploadVideo = await this.cloudinaryService.uploadFile(videoFile);
    console.log('Resultado de carga de video:', uploadVideo);
    if (!uploadVideo || !uploadVideo.secure_url) {
      throw new CloudinaryUploadFailedException();
    }

    createCourseDto.modules.forEach((module) => {
      if (Array.isArray(module.lessons)) {
        // Verifica que lessons sea un array
        module.lessons.forEach((lesson) => {
          lesson.video = {
            url: uploadVideo.secure_url,
            duration: uploadVideo.duration,
            size: uploadVideo.bytes,
            resolution: uploadVideo.resolution,
            format: uploadVideo.format,
            width: uploadVideo.width,
            height: uploadVideo.height,
            created_at: uploadVideo.created_at,
          };
        });
      } else {
        console.error('Lessons is not an array in module:', module);
      }
    });
    // createCourseDto.modules.lessons. = {
    //   url: uploadVideo.secure_url,
    //   duration: uploadVideo.duration,
    //   size: uploadVideo.bytes,
    //   resolution: uploadVideo.resolution,
    //   format: uploadVideo.format,
    //   width: uploadVideo.width,
    //   height: uploadVideo.height,
    //   created_at: uploadImage.created_at,
    // };

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
      createCourseDto.resource = createCourseDto.resource || [];
      createCourseDto.resource.push(pdfData);
    }

    const course = this.courseRepository.create({ ...createCourseDto });
    const savedCourse = await this.courseRepository.save(course);
    if (!savedCourse) {
      throw new CourseCreationFailedException();
    }
    return savedCourse;
  }

  async findAll(): Promise<Course[]> {
    const course = await this.courseRepository.find({
      where: { available: true },
    });
    return course;
  }

  async findOne(id: string): Promise<Course | null> {
    const course = await this.courseRepository.findOne({ where: { id } });
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
