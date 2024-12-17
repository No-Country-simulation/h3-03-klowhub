import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsPositive,
  IsNumber,
} from 'class-validator';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  userId: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsArray()
  @IsOptional()
  sector: string[];

  @IsArray()
  @IsOptional()
  functionalities: string[];

  @IsArray()
  @IsOptional()
  toolsAndPlatforms: string[];

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsArray()
  @IsOptional()
  features: string[];

  @IsArray()
  @IsOptional()
  targetAudience: string[];

  @IsArray()
  @IsOptional()
  views: string[];

  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  @IsArray()
  @IsOptional()
  appIncludes: string[];

  @IsString()
  @IsNotEmpty()
  coverImg: string;

  @IsString()
  @IsNotEmpty()
  desktopLink: string;

  @IsString()
  @IsNotEmpty()
  mobileLink: string;

  @IsArray()
  @IsOptional()
  assets: string[]; // IDs de assets de Cloudinary

  @IsOptional() // Si la promoción es opcional
  promotion?: {
    // Define aquí la estructura de la promoción, si es necesaria
    type?: string;
    promoted?: string;
    percentage?: number;
  };
}
