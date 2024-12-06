import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { VideoDto, DocumentDto, ImageDto } from './multimedia.dto';
import { Multimedia } from '../entities/multimedia.entity';

// class VideoDto {
//   @IsString()
//   url: string;

//   @IsNumber()
//   duration: number;

//   @IsNumber()
//   size: number;

//   @IsString()
//   resolution: string;

//   @IsString()
//   format: string;

//   @IsString()
//   width: string;

//   @IsString()
//   height: string;

//   @IsString()
//   created_at: string;
// }

class LessonDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  free: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => VideoDto)
  video: VideoDto;

  @ValidateNested()
  @Type(() => DocumentDto)
  document: DocumentDto[];
}

class ModuleDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  lessons: LessonDto[];
}

// class ProductDto {
//   @IsNotEmpty()
//   @IsString()
//   id: string;

//   @IsNotEmpty()
//   @IsString()
//   type: string;
// }

// class PromotionDto {
//   @IsNotEmpty()
//   @ValidateNested()
//   @Type(() => ProductDto) // Esto permite validar la clase anidada
//   product: ProductDto;

//   @IsNotEmpty()
//   @IsNumber()
//   percentage: number;
// }

// class CoverImgDto {
//   @IsNotEmpty()
//   @IsString()
//   url: string;

//   @IsNotEmpty()
//   @IsNumber()
//   size: number;

//   @IsNotEmpty()
//   @IsNumber()
//   width: number;

//   @IsNotEmpty()
//   @IsNumber()
//   height: number;

//   @IsNotEmpty()
//   @IsString()
//   format: string;

//   @IsNotEmpty()
//   @IsString()
//   created_at: string;
// }

export class CreateCourseDto {
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  freeCourse: boolean;

  @IsNotEmpty()
  @IsEnum(['lesson', 'course'])
  contentType: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsEnum(['basic', 'intermediate'])
  courseDifficulty: string;

  @IsNotEmpty()
  @IsEnum(['appsheets', 'powerapps'])
  platform: string;

  @IsNotEmpty()
  @IsEnum(['english', 'spanish'])
  language: string;

  @IsNotEmpty()
  @IsEnum([
    'ux-ui',
    'databases',
    'expressions-and-formulas',
    'automation',
    'workflows',
    'actions-behavior',
    'security-accesibility',
    'general',
  ])
  coreContent: string;

  @IsNotEmpty()
  @IsEnum([
    'calendario',
    'generacion-de-pdf',
    'reportes-automaticos',
    'chatbot-bot',
    'emails',
    'sms',
    'notificaciones-push',
    'generacion-y-escaneo-qr',
    'geolocalizacion',
    'ocr',
    'machine-learning',
    'estadisticas-de-uso',
    'dashboard-reportes-y-analisis',
    'gestion-de-usuarios',
    'reporting-avanzado',
    'integracion-de-datos',
    'gestion-de-permisos',
    'analisis-de-datos',
    'optimizacion-performance',
    'despliegue-deploy',
    'importacion-exportacion-de-datos',
    'firmas-digitales',
    'escaneo-de-documentos',
    'monitor-de-automatizaciones',
    'historial-de-auditoria',
    'api-integraciones',
  ])
  functionalities: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum([
    'industria',
    'gestion-del-tiempo',
    'gestion-de-proyectos',
    'gestion-de-inventarios',
    'ventas-y-crm',
    'obras-y-construccion',
    'logistica-y-transporte',
    'servicios-profesionales',
    'marketing-digital',
    'e-commerce',
    'entretenimiento-y-medios',
    'seguridad-y-vigilancia',
    'investigacion-y-desarrollo',
    'agricultura-y-medio-ambiente',
    'administracion',
  ])
  sector: string[];

  @IsNotEmpty()
  @IsEnum([
    'google-sheets',
    'looker-studio',
    'mysql',
    'postgresql',
    'salesforce',
    'airtable',
    'dropbox',
    'box',
    'google-analytics',
    'zapier',
    'wordpress',
    'shopify',
    'whatsapp-api',
    'power-bi',
    'twilio',
    'trello',
    'google-calendar',
    'google-drive',
    'google-maps',
  ])
  toolsAndPlatform: string;

  @IsNotEmpty()
  @IsEnum([
    'plataforma-de-cursos',
    'aplicaciones-sin-codigo',
    'desarrolladores-nocode',
    'powerapps-para-empresas',
    'appsheet-para-negocios',
    'automatizacion-de-tareas',
    'apps-de-productividad',
    'tecnologia-para-empresas',
    'herramientas-nocode',
    'creacion-de-aplicaciones',
  ])
  tags: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  learningSubjects: string[];

  @IsNotEmpty()
  @IsString()
  prevRequirements: string;

  @IsNotEmpty()
  @IsString()
  fullDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];
  ////////////////////////////////////

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ImageDto)
  coverImg: ImageDto;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => PromotionDto)
  // promotion?: PromotionDto;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsString()
  targetAudience: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  multimedia: Multimedia[];

  @IsArray()
  @IsOptional()
  files: any[];
}
