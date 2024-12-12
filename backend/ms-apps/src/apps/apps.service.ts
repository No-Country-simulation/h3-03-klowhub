import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAppDto } from './dto/create-app.dto';
import { App } from './entities/app.entity';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset-dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  CloudinaryUploadFailedException,
  CourseImageSizeFailed,
  CourseVideoSizeFailed,
  ImageFileMissingException,
  PDF_FileSize,
  VideoFileMissingException,
} from 'src/custom-exceptions/custom-exceptions';

@Injectable()
export class AppsService {
  private readonly MAX_IMAGE_SIZE = 10000 * 1024; // 10 MB
  private readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly MAX_PDF_SIZE = 3 * 1024 * 1024; // 3 MB
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
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
    //console.log('fileType antes de la inserción:', createAssetDto.fileType);
    return await this.assetRepository.save(multimedia);
    // const course = this.courseRepository.create({
    //   multimedia: [savedMultimedia],
    // });
    // const savedCourse = await this.courseRepository.save(course);
    // if (!savedCourse) {
    //   throw new CourseCreationFailedException();
    // }
    // return savedCourse;
  }

  async createApp(createAppDto: CreateAppDto): Promise<App> {
    try {
      // Asegúrate de que desktopLink tiene un valor
      const app = this.appRepository.create({
        title: createAppDto.title,
        shortDescription: createAppDto.shortDescription,
        platform: createAppDto.platform,
        language: createAppDto.language,
        sector: createAppDto.sector,
        functionalities: createAppDto.functionalities,
        toolsAndPlatforms: createAppDto.toolsAndPlatforms,
        tags: createAppDto.tags,
        features: createAppDto.features,
        targetAudience: createAppDto.targetAudience,
        views: createAppDto.views,
        fullDescription: createAppDto.fullDescription,
        appIncludes: createAppDto.appIncludes,
        desktopLink: createAppDto.desktopLink,
        mobileLink: createAppDto.mobileLink,
        promotion: createAppDto.promotion,
      });

      // Guarda la aplicación en la base de datos
      const savedApp = await this.appRepository.save(app);

      // Buscar y asignar el asset para coverImg
      const coverImgAsset = await this.assetRepository.findOne({
        where: { id: createAppDto.coverImg },
      });
      if (coverImgAsset) {
        savedApp.coverImg = coverImgAsset; // Asigna el objeto Asset a coverImg
      }

      // Asignar los assets a la aplicación
      const assetEntities = await this.assetRepository.find({
        where: { id: In(createAppDto.assets) },
      });
      savedApp.assets = assetEntities;

      // Guarda la aplicación actualizada con las relaciones
      return await this.appRepository.save(savedApp);
    } catch (error) {
      throw new ConflictException(
        `Error al crear la aplicación: ${error.message}`,
      );
    }
  }
  async findOne(id: string): Promise<App> {
    const app = await this.appRepository.findOne({
      where: { id },
      relations: ['coverImg', 'assets'],
    });

    if (!app) {
      throw new NotFoundException(`App with ID ${id} not found`);
    }

    // Verificar si coverImg y assets están definidos antes de acceder a sus propiedades
    const coverImageDetails = app.coverImg
      ? await this.assetRepository.findOne({ where: { id: app.coverImg.id } })
      : null;

    const assetDetails =
      app.assets && app.assets.length > 0
        ? await this.assetRepository.find({
            where: { id: In(app.assets.map((asset) => asset.id)) },
          })
        : [];

    return {
      ...app,
      coverImg: coverImageDetails,
      assets: assetDetails,
    };
  }

  async findAll(): Promise<App[]> {
    const apps = await this.appRepository.find({
      relations: ['coverImg', 'assets'],
    });

    return Promise.all(
      apps.map(async (app) => {
        const coverImageDetails = app.coverImg
          ? await this.assetRepository.findOne({
              where: { id: app.coverImg.id },
            })
          : null;

        const assetDetails =
          app.assets && app.assets.length > 0
            ? await this.assetRepository.find({
                where: { id: In(app.assets.map((asset) => asset.id)) },
              })
            : [];

        return {
          ...app,
          coverImg: coverImageDetails,
          assets: assetDetails,
        };
      }),
    );
  }
}
