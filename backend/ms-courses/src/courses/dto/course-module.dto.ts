import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { MultimediaDto } from './multimedia.dto';
import { CreateLessonDto } from './lesson.dto';

export class CreateCourseModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  multimedia?: MultimediaDto[];

  @IsOptional()
  @IsArray()
  lessons?: CreateLessonDto[];
}
