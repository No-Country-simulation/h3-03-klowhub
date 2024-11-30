import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class VideoDto {
  @IsString()
  id: string;

  @IsString()
  url: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  size: number;

  @IsString()
  format: string;

  @IsString()
  width: string;

  @IsString()
  height: string;

  @IsString()
  thumbnail_url: string;

  @IsString()
  created_at: string;

  @IsOptional()
  @IsArray()
  @Type(() => String) // Aquí, simplemente estamos usando strings para los IDs
  lessonIds?: string[];
}
