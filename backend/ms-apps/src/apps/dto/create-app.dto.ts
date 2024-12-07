import { IsString, IsArray, IsBoolean } from 'class-validator';

export class CreateAppDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  platform: string;

  @IsArray()
  tools: string[];

  @IsArray()
  languages: string[];

  @IsArray()
  functionalities: string[];

  @IsString()
  sector: string;

  @IsArray()
  relatedFunctionalities: string[];

  @IsString()
  targetAudience: string;

  @IsString()
  advantages: string;

  @IsString()
  coverImage: string;

  @IsArray()
  mockupImages: string[];

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
}
