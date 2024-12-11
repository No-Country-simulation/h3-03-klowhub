import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateAssetDto } from './create-asset-dto';

export class CreateAppDto {
  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  platform: string;

  @IsString()
  languages: string;

  @IsArray()
  functionalities: string[];

  @IsString()
  sector: string;

  @IsArray()
  tools: string[];

  @IsString()
  targetAudience: string;

  @IsString()
  advantages: string;

  @IsArray()
  tags: string[];

  @IsArray()
  features: string[];

  @IsString()
  views: string;

  @IsString()
  appIncludes: string;

  @IsString()
  fullDescription: string;

  @IsString()
  coverImage: string;

  @IsString()
  mobileVersionLink: string;

  @IsString()
  desktopVersionLink: string;

  @IsBoolean()
  isPromotion: boolean;

  @IsString()
  course: string;

  @IsString()
  discount: string;

  @IsString()
  rating: string;

  @IsString()
  review: string;

  @IsString()
  emailToAccess: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets: CreateAssetDto[];

  @IsArray()
  @IsOptional()
  assetsIds?: string[];
}
