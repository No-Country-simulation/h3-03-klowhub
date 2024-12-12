import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  documents: string[];

  @IsString()
  @IsOptional()
  video?: string[];

  @IsBoolean()
  @IsOptional()
  freeLesson: boolean;

  @IsString()
  @IsOptional()
  link?: string;
}
