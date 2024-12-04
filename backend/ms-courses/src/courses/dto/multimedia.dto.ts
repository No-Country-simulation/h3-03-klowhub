// import { Transform } from 'class-transformer';
// import { TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsEnum,
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

// Transformador personalizado para la propiedad `fileMetadata`
// function fileMetadataTransformer({ value, obj }: TransformFnParams) {
//   // Desestructuración de params correctamente tipados
//   switch (obj.fileType) {
//     case 'video':
//       return Object.assign(new VideoDto(), value);
//     case 'image':
//       return Object.assign(new ImageDto(), value);
//     case 'document':
//       return Object.assign(new DocumentDto(), value);
//     default:
//       return value;
//   }
// }

// DTO para Multimedia
export class MultimediaDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsEnum(['video', 'image', 'document'])
  fileType: 'video' | 'image' | 'document';

  @ValidateNested()
  //@Transform(fileMetadataTransformer) // Usamos el transformador personalizado aquí
  fileMetadata: VideoDto | ImageDto | DocumentDto;
}
