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
  @IsOptional()
  id: string;

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

  // @IsNotEmpty()
  // @IsEnum(CoreContent)
  // coreContent: CoreContent;
  @IsArray()
  @IsString({ each: true })
  coreContent: string[];

  // @IsNotEmpty()
  // @IsEnum(Functionalities)
  // functionalities: Functionalities;
  @IsArray()
  @IsString({ each: true })
  functionalities: string[];

  // @IsNotEmpty()
  // @IsArray()
  // @IsEnum(Sector)
  // sector: Sector;
  @IsArray()
  @IsString({ each: true })
  sector: string[];

  // @IsNotEmpty()
  // @IsEnum(ToolsAndPlatform)
  // toolsAndPlatform: ToolsAndPlatform;
  @IsArray()
  @IsString({ each: true })
  toolsAndPlatform: string[];

  // @IsNotEmpty()
  // @IsEnum(Tags)
  // tags: Tags;
  @IsArray()
  @IsString({ each: true })
  tags: string[];

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
