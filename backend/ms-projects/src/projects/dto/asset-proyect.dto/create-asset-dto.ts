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
  url: string;

  @IsNumber()
  size: number;

  @IsString()
  mimeType: string;

  @IsDateString()
  created_at: string;
}
export class CreateAssetDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEnum(['video', 'image', 'document'])
  fileType: 'video' | 'image' | 'document';

  @ValidateNested()
  //@Transform(fileMetadataTransformer) // Usamos el transformador personalizado aquí
  fileMetadata: VideoDto | ImageDto | DocumentDto;
}
