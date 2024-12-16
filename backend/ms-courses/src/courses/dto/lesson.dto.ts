import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { DocumentDto, VideoDto } from './multimedia.dto';

import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsString()
  // @IsOptional()
  // documents?: DocumentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  @IsOptional()
  documents?: DocumentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  @IsOptional()
  video?: VideoDto[];
  // @IsString()
  // @IsOptional()
  // video?: string[];
  @IsBoolean()
  @IsOptional()
  freeLesson: boolean;

  @IsString()
  @IsOptional()
  link?: string;
}
