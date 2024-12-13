// import { Transform } from 'class-transformer';
// import { TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';

// DTO para Video
export class VideoDto {
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

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  mimeType: string;

  @IsString()
  thumbnailUrl: string;

  @IsNumber()
  thumbnailWidth: number;

  @IsNumber()
  thumbnailHeight: number;

  @IsDateString()
  created_at: string;
}

// DTO para CoverImg
export class ImageDto {
  @IsString()
  url: string;

  @IsNumber()
  size: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  format: string;

  @IsString()
  mimeType: string;

  @IsDateString()
  created_at: string;
}

// DTO para Document
export class DocumentDto {
  @IsString()
  filename: string;

  @IsString()
  url: string;

  @IsNumber()
  size: number;

  @IsString()
  mimeType: string;

  @IsDateString()
  created_at: string;
}

// DTO para Multimedia
export class MultimediaDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsEnum(['video', 'image', 'document'])
  fileType: 'video' | 'image' | 'document';

  @ValidateNested()
  fileMetadata: VideoDto | ImageDto | DocumentDto;
}
