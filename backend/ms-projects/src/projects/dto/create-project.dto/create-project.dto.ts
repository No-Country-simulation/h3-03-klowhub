import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  platform: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  sector: string;

  @IsString()
  methodology: string;

  @IsString()
  experienceLevel: string;

  @IsArray()
  @IsString({ each: true })
  technicalRequirements: string[];

  @IsArray()
  @IsString({ each: true })
  requiredKnowledge: string[];

  @IsNumber()
  days: number;

  @IsNumber()
  minBudget: number;

  @IsNumber()
  maxBudget: number;

  @IsArray()
  @IsString({ each: true })
  requiredSkills: string[];
  
  @IsArray()
  @IsOptional()
  assets?: object[];

  @IsString()
  status: string;

  @IsString()
  userId: string;



}
