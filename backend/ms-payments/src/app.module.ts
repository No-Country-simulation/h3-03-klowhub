import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaypalModule } from './paypal/paypal.module';
import { StripeModule } from './stripe/stripe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PaypalModule, StripeModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
