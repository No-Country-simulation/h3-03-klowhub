import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaypalModule } from './paypal/paypal.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [PaypalModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
