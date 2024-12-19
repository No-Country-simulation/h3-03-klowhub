import {
  IsBoolean,
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

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  freeCourse: boolean;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  contentType: string[];

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  courseDifficulty: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  platform: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  language: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  coreContent?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  functionalities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  sector?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  toolsAndPlatform?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  tags?: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  learningSubjects: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  prevRequirements: string[];

  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MultimediaDto)
  coverImg?: MultimediaDto;
  // @IsString()
  // coverImg: string;

  @IsJSON()
  @IsNotEmpty()
  @IsNotEmpty()
  promotion?: {
    type?: string;
    promoted?: string;
    percentage?: number;
  };

  @IsBoolean()
  @IsNotEmpty()
  available: boolean = true;

  @IsString()
  @IsNotEmpty()
  targetAudience: string[];

  @IsDecimal()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  courseIncludes: string[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MultimediaDto)
  promotionalVideo?: MultimediaDto;

  // @IsNumber()
  // userId: number;

  // @IsArray()
  // @IsNotEmpty()
  // @IsNotEmpty()
  // multimedia?: MultimediaDto[];
  @IsNotEmpty()
  @IsString()
  authorId: string;

  // @IsArray()
  // @IsNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => MultimediaDto)
  // documents?: MultimediaDto[]; // Aquí agregamos la propiedad documents
  //lo ultimo que agregue!!!!
  @IsArray()
  @IsNotEmpty()
  modules?: CreateCourseModuleDto[];
}
