import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  platform: string;

  @IsString()
  description: string;

  @IsString()
  sector: string;

  @IsString()
  methodology: string;

  @IsString()
  experienceLevel: string;

  @IsString()
  technicalRequirements: string;

  @IsNumber()
  days: number;

  @IsNumber()
  budget: number;

  @IsString()
  requiredSkills: string;

  @IsString()
  requiredFiles: string;

  @IsArray()
  @IsOptional()
  reviews?: string[];

  @IsNumber()
  rating: number;

  @IsString()
  userId: string;



}
