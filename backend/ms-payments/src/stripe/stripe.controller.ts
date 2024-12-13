import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('charge')
  async charge(@Body() createStripeDto: CreateStripeDto) {
    return await this.stripeService.createCharge(
      createStripeDto.amount,
      createStripeDto.currency,
      createStripeDto.source,
    );
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }
}
