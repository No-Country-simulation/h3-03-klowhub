// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { PaymentsService } from 'src/order/payment.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post('charge')
  async charge(@Body() createStripeDto: CreateStripeDto) {
    // Crear un cargo en Stripe
    const charge = await this.stripeService.createCharge(
      createStripeDto.amount,
      createStripeDto.currency,
      createStripeDto.source,
    );

    // Crear un registro de pago en la base de datos
    const paymentData: CreateStripeDto = {
      userId: createStripeDto.userId,
      amount: createStripeDto.amount,
      currency: createStripeDto.currency,
      source: createStripeDto.source, // Asegúrate de incluir el source
      subscriptionTier: createStripeDto.subscriptionTier, // Asegúrate de incluir el subscriptionTier
    };

    await this.paymentsService.createPayment(paymentData); // Cambia aquí

    return charge; // Devuelve el cargo o un mensaje de éxito
  }
}
