import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsJSON,
  IsDecimal,
  IsNotEmpty,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { MultimediaDto } from './multimedia.dto';
import { CreateCourseModuleDto } from './course-module.dto';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  id: string;

  // @IsString()
  // @IsOptional()
  // userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  freeCourse: boolean;

  @IsArray()
  @IsString({ each: true })
  contentType: string[];

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsArray()
  @IsString({ each: true })
  courseDifficulty: string[];

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

  @IsArray()
  @IsString({ each: true })
  prevRequirements: string[];

  @IsString()
  fullDescription: string;

  @ValidateNested()
  @Type(() => MultimediaDto)
  coverImg?: MultimediaDto;
  // @IsString()
  // coverImg: string;

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
  targetAudience: string[];

  @IsDecimal()
  @IsPositive()
  price: number;

  @IsArray()
  @IsString()
  courseIncludes: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  promotionalVideo?: string[];

  // @IsNumber()
  // userId: number;

  @IsArray()
  @IsOptional()
  multimedia?: MultimediaDto[];

  @IsArray()
  @IsOptional()
  modules?: CreateCourseModuleDto[];
}
