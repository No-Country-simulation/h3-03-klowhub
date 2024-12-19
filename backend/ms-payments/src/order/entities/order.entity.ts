// src/order/entities/order.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SubscriptionTier {
  PROFESSIONAL = 'professional',
  EXPERT = 'expert',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid') // UUID
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionTier,
  })
  subscriptionTier: SubscriptionTier; // Solo 'professional' o 'expert'

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // Precio final a pagar (mensual o anual)

  @Column()
  currency: string;

  @Column()
  paymentMethod: string;

  @Column()
  status: string; // 'pending', 'completed', 'failed', etc.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
