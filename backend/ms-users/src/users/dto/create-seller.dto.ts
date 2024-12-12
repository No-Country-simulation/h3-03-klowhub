import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ description: 'Tipo de usuario' })
  @IsNotEmpty()
  @IsEnum([
    'desarrollador-de-apps',
    'creador-de-contenido-educativo',
    'equipo-de-desarrollo',
    'appSheet-expert',
  ])
  type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  about: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  website?: string; // Enlace de sitio web/portfolio (opcional)

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  documentImg?: string; // Fotos para validar identidad (opcional)

  @ApiProperty({ enum: ['payPal', 'stripe', 'crypto'] })
  @IsOptional()
  @IsEnum(['payPal', 'stripe', 'crypto'])
  payment_method: string; // Método de pago preferido
}
