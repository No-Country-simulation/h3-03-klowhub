import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromotionProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['course', 'application'] })
  type: string;

  @Column({ type: 'decimal' })
  percentage: number;

  @Column()
  promotedId: string;
}
//Este   percentage: number; puede ser el id de un curso o de una aplicacion.
