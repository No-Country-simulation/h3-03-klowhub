import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { MultimediaDto } from './multimedia.dto';
import { CreateLessonDto } from './lesson.dto';

export class CreateCourseModuleDto {
  @IsString() // Asegúrate de que el ID sea de tipo string
  id: string; // Cambiar `any` a `string`

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

  @IsString()
  @IsNotEmpty()
  courseId: string; // Campo que se usará para asociar el módulo al curso
}
