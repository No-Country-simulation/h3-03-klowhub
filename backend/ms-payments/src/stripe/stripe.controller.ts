import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentService } from 'src/payments/payment.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('charge')
  async charge(@Body() createStripeDto: CreateStripeDto) {
    const charge = await this.stripeService.createCharge(
      createStripeDto.amount,
      createStripeDto.currency,
      createStripeDto.source,
    );

    // Guarda el pago en la base de datos
    const paymentData: Partial<Payment> = {
      userId: createStripeDto.userId, // Asegúrate de recibir el userId
      courseId: createStripeDto.courseId, // Asegúrate de recibir el courseId
      amount: createStripeDto.amount,
      currency: createStripeDto.currency,
      paymentMethod: 'Stripe',
      status: charge.status, // O el estado que devuelva Stripe
    };

    await this.paymentService.createPayment(paymentData);

    return charge; // Devuelve el cargo o un mensaje de éxito
  }
  @Get()
  async findAll() {
    return await this.paymentService.findAllPayments(); // Cambiado para usar el servicio de pagos
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findPaymentById(+id); // Cambiado para usar el servicio de pagos
  }
}
