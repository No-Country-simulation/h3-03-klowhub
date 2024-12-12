import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsJSON,
  IsDecimal,
  IsNotEmpty,
} from 'class-validator';
import { MultimediaDto } from './multimedia.dto';
import { CreateCourseModuleDto } from './course-module.dto';

export class CreateCourseDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  freeCourse: boolean;

  @IsArray()
  @IsString({ each: true })
  contentType: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsArray()
  @IsString({ each: true })
  courseDifficulty: string;

  @IsArray()
  @IsString({ each: true })
  platform: string[];

  @IsArray()
  @IsString({ each: true })
  language: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  coreContent?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  functionalities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sector?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  toolsAndPlatform?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  learningSubjects: string[];

  @IsString()
  prevRequirements: string;

  @IsString()
  fullDescription: string;

  @IsString()
  coverImg: string;

  @IsJSON()
  @IsOptional()
  promotion?: {
    type?: string;
    promoted?: string;
    percentage?: number;
  };

  @IsBoolean()
  @IsOptional()
  available: boolean = true;

  @IsString()
  targetAudience: string;

  @IsDecimal()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  promotionalVideo?: string[];

  @IsArray()
  @IsOptional()
  multimedia?: MultimediaDto[];

  @IsArray()
  @IsOptional()
  modules?: CreateCourseModuleDto[];
}
