import { Injectable } from '@nestjs/common';
import { envs } from 'config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(envs.stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCharge(amount: number, currency: string, source: string) {
    return await this.stripe.charges.create({
      amount,
      currency,
      source,
    });
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }
}
