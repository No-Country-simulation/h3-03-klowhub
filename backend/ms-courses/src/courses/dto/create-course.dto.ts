import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';

class MaterialAdicionalDto {
  @IsString()
  url: string;

  @IsNumber()
  size: number;

  @IsString()
  created_at: string;
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  tituloDelCurso: string;

  @IsNotEmpty()
  @IsEnum(['Gratuito', 'Pago'])
  tipoDeCurso: string;

  @IsNotEmpty()
  @IsEnum(['Lección', 'Curso'])
  tipoDeContenido: string;

  @IsNotEmpty()
  @IsString()
  descripcionDelCurso: string;

  @IsNotEmpty()
  @IsEnum(['Basico', 'Intermedio'])
  nivelDeCompetencia: string;

  @IsNotEmpty()
  @IsEnum(['Apps sheets', 'Power Apps'])
  plataforma: string;

  @IsNotEmpty()
  @IsString()
  idioma: string;

  @IsNotEmpty()
  @IsString()
  contenido: string;

  @IsNotEmpty()
  @IsString()
  funcionalidades: string;

  @IsNotEmpty()
  @IsString()
  sector: string;

  @IsNotEmpty()
  @IsString()
  herramientasYPlataformas: string;

  @IsNotEmpty()
  @IsString()
  etiquetas: string;

  @IsNotEmpty()
  @IsString()
  aprendizaje: string;

  @IsNotEmpty()
  @IsString()
  requisitosPrevios: string;

  @IsNotEmpty()
  @IsString()
  descripcionDetallada: string;

  @IsNotEmpty()
  @IsObject()
  imagenDePortada: {
    url: string;
    size: number;
    width: number;
    height: number;
    format: string;
    created_at: string;
  };

  @IsOptional()
  @IsObject()
  video: {
    url: string;
    duration: number;
    size: number;
    resolution: string;
    format: string;
    width: string;
    height: string;
    created_at: string;
  };

  @IsNotEmpty()
  @IsString()
  tituloDelModulo: string;

  @IsNotEmpty()
  @IsString()
  descripcionDelModulo: string;

  @IsNotEmpty()
  @IsString()
  tituloDeLaLeccion: string;

  @IsNotEmpty()
  @IsString()
  descripcionDeLaLeccion: string;

  @IsNotEmpty()
  @IsString()
  contenidoDeLaLeccion: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialAdicionalDto)
  materialAdicional: MaterialAdicionalDto[];

  @IsNotEmpty()
  @IsBoolean()
  descuento: boolean;

  @IsNotEmpty()
  @IsBoolean()
  promociones: boolean;

  @IsOptional()
  @IsNumber()
  porcentajeDeDescuento?: number;
}
