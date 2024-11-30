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

class VideoDto {
  @IsString()
  url: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  size: number;

  @IsString()
  resolution: string;

  @IsString()
  format: string;

  @IsString()
  width: string;

  @IsString()
  height: string;

  @IsString()
  created_at: string;
}

class LessonDto {
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
}

class ModuleDto {
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

class ProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

class PromotionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductDto) // Esto permite validar la clase anidada
  product: ProductDto;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;
}

class CoverImgDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsString()
  format: string;

  @IsNotEmpty()
  @IsString()
  created_at: string;
}

class ResourceDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsString()
  mimeType: string;

  @IsNotEmpty()
  @IsString()
  created_at: string;
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  freeContent: boolean;

  @IsNotEmpty()
  @IsEnum(['Lección', 'Curso'])
  contentType: string;

  @IsNotEmpty()
  @IsString()
  summarizeDescription: string;

  @IsNotEmpty()
  @IsEnum(['Basico', 'Intermedio'])
  courseDifficulty: string;

  @IsNotEmpty()
  @IsEnum(['Appsheets', 'PowerApps'])
  platform: string;

  @IsNotEmpty()
  @IsEnum(['Inglés', 'Español'])
  language: string;

  @IsNotEmpty()
  @IsEnum([
    'UX-UI',
    'Base de datos',
    'Expresiones y fórmulas',
    'Automatización',
    'Flujos de trabajo',
    'Seguridad-Accesibilidad',
    'General',
    'Acciones-Behaviour',
  ])
  coreContent: string;

  @IsNotEmpty()
  @IsEnum([
    'Calendario',
    'Generación de PDF',
    'Reportes automáticos',
    'Chatbot(BOT)',
    'Emails',
    'SMS',
    'Notificaciones Push',
    'Generación y Escaneo QR',
    'Geolocalización',
    'OCR',
    'Machine Learning',
    'Estadísticas de uso',
    'Dashboard - Repostes y analisis',
  ])
  funcionalidades: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum([
    'Industria',
    'Gestión del tiempo',
    'Gestión de proyectos',
    'Gestión de inventarios',
    'Ventas y CRM',
    'Obras y contrucción',
    'Logistica y transporte',
    'Servicios profesionales',
    'Marketing digital',
    'E-Commerce',
    'Entretenimiento y medios',
    'Seguridad y vigilancia',
    'Investigación y desarrollo',
    'Agricultura y medio ambiente',
    'Administración',
  ])
  sector: string[];

  @IsNotEmpty()
  @IsEnum([
    'Google Sheets',
    'Looker Studio',
    'MySQL',
    'PostgreSQL',
    'Salesforce',
    'Airtable',
    'Dropbox',
    'Box',
    'Google Analitics',
    'Zapier',
    'Wordpress',
    'Shopify',
    'WhasApp API',
    'Powe BI',
    'Twilo',
    'Trello',
    'Google Calendar',
    'Google Drive',
    'Google Maps',
    'Gestión de Usuarios',
    'Reporting avanzado',
    'Integración de datos',
    'Gestión de permisos',
    'Analisis de datos',
    'Optimización Performance',
    'Despliegue Deploy',
    'Importación - exportación de datos',
    'Firmas digitales',
    'Escaneo de documentos',
    'Monitor de automatizaciones',
    'Historial de auditoria',
    'API - Integraciones',
  ])
  toolsAndPlatform: string;

  @IsNotEmpty()
  @IsString()
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
  detailedDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];

  @ValidateNested()
  @Type(() => CoverImgDto)
  coverImg: CoverImgDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resource?: ResourceDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PromotionDto)
  promotion?: PromotionDto;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
