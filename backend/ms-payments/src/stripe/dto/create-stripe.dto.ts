// src/stripe/dto/create-stripe.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStripeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  source: string; // Token de la tarjeta

  @IsNotEmpty()
  userId: string; // ID del usuario

  @IsNotEmpty()
  courseId: string; // ID del curso
}
