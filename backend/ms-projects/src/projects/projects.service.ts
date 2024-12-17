import { Injectable, NotFoundException, ConflictException,
  BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto/create-project.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Asset } from './entities/asset.entity/asset.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  CloudinaryUploadFailedException,
  CourseImageSizeFailed,
  CourseVideoSizeFailed,
  ImageFileMissingException,
  PDF_FileSize,
  VideoFileMissingException,
} from 'src/custom-exceptions/custom-exceptions';
import { CreateAssetDto } from './dto/asset-proyect.dto/create-asset-dto';
import { platform } from 'os';

@Injectable()
export class ProjectsService {
  private readonly MAX_IMAGE_SIZE = 10000 * 1024; // 10 MB
  private readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly MAX_PDF_SIZE = 3 * 1024 * 1024; // 3 MB
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly httpService: HttpService,
  ){}

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

  async createAssets(
    createAssetDto: CreateAssetDto,
    file: Express.Multer.File,
    fileType: string,
  ): Promise<CreateAssetDto> {
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
      createAssetDto.fileMetadata = {
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        mimeType: file.mimetype,
        created_at: uploadResult.created_at,
      };
      createAssetDto.fileType = 'image';
    } else if (fileType === 'video') {
      createAssetDto.fileMetadata = {
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
      createAssetDto.fileType = 'video';
    } else if (fileType === 'document') {
      // multimediaDto.fileMetadata = multimediaDto.fileMetadata || [];
      createAssetDto.fileMetadata = {
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        mimeType: file.mimetype,
        created_at: uploadResult.created_at,
      };
      createAssetDto.fileType = 'document';
    } else {
      throw new BadRequestException('Tipo de archivo no soportado');
    }

    // Guarda los datos en la base de datos
    const multimedia = this.assetRepository.create(createAssetDto);
  
    return await this.assetRepository.save(multimedia);

  }


  // async createProject(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
  //   const { assets, ...rest } = createProjectDto;

  //   // Transformar `assets` si no está en el formato adecuado
  //   const formattedAssets = assets ? assets.map((asset) => String(asset)) : [];

  //   const project = this.projectRepository.create({
  //     ...rest,
  //     userId,
  //     assets: formattedAssets,
  //   });

  //   return await this.projectRepository.save(project);
  // }

  async createProject(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
  
    try{
      const project = this.projectRepository.create({
        title:createProjectDto.title,
        platform: createProjectDto.platform,
        description: createProjectDto.description,
        sector: createProjectDto.sector,
        methodology: createProjectDto.methodology,
        experienceLevel: createProjectDto.experienceLevel,
        technicalRequirements: createProjectDto.technicalRequirements,
        requiredSkills: createProjectDto.requiredSkills,
        days: createProjectDto.days,
        minBudget: createProjectDto.minBudget,
        maxBudget: createProjectDto.maxBudget,
        additionalRequirements: createProjectDto.additionalRequirements,
        authorId: userId,
        tags: createProjectDto.tags,
        status: createProjectDto.status
      })
      const savedProject = await this.projectRepository.save(project);

      const assetEntities = await this.assetRepository.find({
        where: { id: In(createProjectDto.assets) },
      });
      savedProject.assets = assetEntities;

      return await this.projectRepository.save(savedProject);
    } catch (error){
      throw new ConflictException(`Error al crear el proyecto: ${error.message}`);
    }
  }



  async deleteProject(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, data);
    return this.projectRepository.findOneBy({ id });
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({ where: { userId } });

    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No se encontraron proyectos para el usuario con ID ${userId}`);
    }

    return projects;
  }

  async findOneByIdWithUser(id: string): Promise<any> {
    const project = await this.projectRepository.findOne({where: {id} });
    if (!project){
      throw new NotFoundException (`Project with ID ${id} not found`);
    }
    const userResponse = await lastValueFrom(
      this.httpService.get(`http://localhost:3001/users/${project.userId}`),
      );
      return {
        ...project,
        author: userResponse.data,
      }
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
