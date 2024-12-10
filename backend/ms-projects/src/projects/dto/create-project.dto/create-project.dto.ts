import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Título del proyecto', example: 'Proyecto Innovador' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Plataforma del proyecto', example: 'Web' })
  @IsString()
  platform: string;

  @ApiProperty({ description: 'Descripción opcional del proyecto', example: 'Una plataforma para gestionar tareas.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Sector del proyecto', example: 'Tecnología' })
  @IsString()
  sector: string;

  @ApiProperty({ description: 'Metodología de trabajo', example: 'Ágil' })
  @IsString()
  methodology: string;

  @ApiProperty({ description: 'Nivel de experiencia requerido', example: 'Senior' })
  @IsString()
  experienceLevel: string;

  @ApiProperty({ description: 'Requisitos técnicos', example: ['NestJS', 'PostgreSQL'] })
  @IsArray()
  @IsString({ each: true })
  technicalRequirements: string[]; 

  @ApiProperty({ description: 'Requisitos adicionales', example: ['Arquitectura de microservicios'] })
  @IsArray()
  @IsString({ each: true })
  additionalRequirements: string[];

  @ApiProperty({ description: 'Duración estimada en días', example: 30 })
  @IsNumber()
  days: number;

  @ApiProperty({ description: 'Presupuesto mínimo', example: 1000 })
  @IsNumber()
  minBudget: number;

  @ApiProperty({ description: 'Presupuesto máximo', example: 5000 })
  @IsNumber()
  maxBudget: number;

  @ApiProperty({ description: 'Habilidades requeridas', example: ['Trabajo en equipo', 'Liderazgo'] })
  @IsArray()
  @IsString({ each: true })
  requiredSkills: string[]; // conocimientos necesarios/ habilidades necesarias

  @ApiProperty({ description: 'Activos opcionales', example: [{ type: 'logo', url: 'http://example.com/logo.png' }] })
  @IsArray()
  @IsOptional()
  assets?: object[];

  @ApiProperty({ description: 'Estado del proyecto', example: 'Activo' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'ID del usuario asociado', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  userId: string;
}