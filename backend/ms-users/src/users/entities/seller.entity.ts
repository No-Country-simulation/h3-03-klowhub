import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: [
      'desarrollador-de-apps',
      'creador-de-contenido-educativo',
      'equipo-de-desarrollo',
      'appSheet-expert',
    ],
  })
  type: string; // Tipo de vendedor

  @Column('text', {
    default:
      'Experto en desarrollo de aplicaciones no-code con más de 5 años de experiencia en AppSheet y Power Apps, ayudando a empresas y emprendedores.',
  })
  about: string; // Descripción de ti o empresa

  @Column({ nullable: true })
  website?: string; // Enlace de sitio web/portfolio

  @Column('text', { nullable: true })
  documentImg?: string; // Fotos para validar identidad (puede ser una URL o referencia a un almacenamiento)

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['payPal', 'stripe', 'crypto'],
  })
  paymentMethod: string; // Método de pago preferido

  @OneToOne(() => User, (user) => user.seller)
  user: User; // Relación con User
}
