import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { PaymentModule } from 'src/order/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
