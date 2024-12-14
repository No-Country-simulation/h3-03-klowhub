import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post()
  create(@Body() createPaypalDto: CreatePaypalDto) {
    return this.paypalService.create(createPaypalDto);
  }

  @Get()
  findAll() {
    return this.paypalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paypalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaypalDto: UpdatePaypalDto) {
    return this.paypalService.update(+id, updatePaypalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paypalService.remove(+id);
  }
}
