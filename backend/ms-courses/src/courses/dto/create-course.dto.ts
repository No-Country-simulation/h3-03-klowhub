import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

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
  enseñanzas: string;

  @IsNotEmpty()
  @IsString()
  requisitosPrevios: string;

  @IsNotEmpty()
  @IsString()
  descripcionDetallada: string;

  @IsNotEmpty()
  @IsString()
  imagenDePortada: string;

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

  @IsNotEmpty()
  @IsString()
  materialAdicional: string;

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
