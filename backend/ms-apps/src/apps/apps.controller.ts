import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { AppsService } from './apps.service';
import { App } from './entities/app.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAssetDto } from './dto/create-asset-dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appService: AppsService) {}

  //MULTIMEDIA ROUTES
  @Post('multimedia')
  @UseInterceptors(FileInterceptor('file'))
  async createAsset(
    @Body() createAssetDto: CreateAssetDto,
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
      return await this.appService.createAssets(createAssetDto, file, fileType);
    } catch (error) {
      console.error('Error capturado en catch:', error); // Log del error capturado
    }
  }

  //APP ROUTES
  @Post()
  async create(@Body() createAppDto: CreateAppDto): Promise<App> {
    return this.appService.createApp(createAppDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<App> {
    return this.appService.findOne(id);
  }

  @Get()
  async findAll(): Promise<App[]> {
    return this.appService.findAll();
  }
}
