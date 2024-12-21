// src/order/payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreateStripeDto } from '../stripe/dto/create-stripe.dto';
import { Order } from './entities/order.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('charge')
  async createPayment(
    @Body() createStripeDto: CreateStripeDto,
  ): Promise<Order> {
    return this.paymentsService.createPayment(createStripeDto);
  }
}
