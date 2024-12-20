// src/order/payment.service.ts
import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from '../stripe/dto/create-stripe.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeService } from '../stripe/stripe.service';
import { SubscriptionTier } from './entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async createPayment(createStripeDto: CreateStripeDto): Promise<Order> {
    const { amount, userId, subscriptionTier, source } = createStripeDto;

    // 1. Verificar el subscriptionTier
    if (!Object.values(SubscriptionTier).includes(subscriptionTier)) {
      throw new Error('Invalid subscription tier');
    }

    // 2. Crear un cargo en Stripe
    const charge = await this.stripeService.createCharge(
      amount,
      createStripeDto.currency,
      source,
    );

    // 3. Crear la orden en la base de datos
    const order = this.ordersRepository.create({
      userId,
      subscriptionTier,
      amount,
      currency: createStripeDto.currency,
      paymentMethod: source, // O el ID del método de pago
      status: charge.status, // 'succeeded', 'pending', etc.
    });

    return this.ordersRepository.save(order);
  }
}
