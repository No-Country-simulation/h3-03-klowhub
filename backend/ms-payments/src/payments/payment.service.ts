// src/payments/payment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentRepository.create(paymentData);
    return await this.paymentRepository.save(payment);
  }

  async findPaymentById(id: number): Promise<Payment> {
    return await this.paymentRepository.findOneBy({ id });
  }

  async findAllPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }
}
