import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { SubscriptionTier } from '../../order/entities/order.entity'; // Asegúrate de que la ruta sea correcta

export class CreateStripeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number; // Precio a pagar

  @IsNotEmpty()
  @IsString()
  currency: string; // Moneda del pago

  @IsNotEmpty()
  @IsString()
  source: string; // Token de la tarjeta

  @IsNotEmpty()
  userId: string; // ID del usuario

  @IsNotEmpty()
  @IsEnum(SubscriptionTier)
  subscriptionTier: SubscriptionTier; // Tier de suscripción
}
