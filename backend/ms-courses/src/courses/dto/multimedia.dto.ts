import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsArray,
  IsOptional,
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
  thumbnail_url: string;

  @IsNumber()
  thumbnail_width: number;

  @IsNumber()
  thumbnail_height: number;

  @IsDateString()
  created_at: string;
}

// DTO para CoverImg
export class CoverImgDto {
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
  @IsOptional()
  @IsString()
  id?: string;

  @ValidateNested()
  @Type(() => VideoDto)
  video: VideoDto;

  @ValidateNested()
  @Type(() => CoverImgDto)
  coverImg: CoverImgDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];
}
