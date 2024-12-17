import { Injectable } from '@nestjs/common';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';

@Injectable()
export class PaypalService {
  create(createPaypalDto: CreatePaypalDto) {
    return 'This action adds a new paypal';
  }

  findAll() {
    return `This action returns all paypal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypal`;
  }

  update(id: number, updatePaypalDto: UpdatePaypalDto) {
    return `This action updates a #${id} paypal`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypal`;
  }
}
