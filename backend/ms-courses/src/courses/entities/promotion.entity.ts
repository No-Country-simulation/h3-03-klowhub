import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromotionProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
