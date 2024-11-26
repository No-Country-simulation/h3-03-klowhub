import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tituloDelCurso: string;

  @Column({ type: 'enum', enum: ['Gratuito', 'Pago'] })
  tipoDeCurso: string;

  @Column({ type: 'enum', enum: ['Lección', 'Curso'] })
  tipoDeContenido: string;

  @Column({ type: 'text' })
  descripcionDelCurso: string;

  @Column({ type: 'enum', enum: ['Basico', 'Intermedio'] })
  nivelDeCompetencia: string;

  @Column({ type: 'enum', enum: ['Apps sheets', 'Power Apps'] })
  plataforma: string;

  @Column()
  idioma: string;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ type: 'text' })
  funcionalidades: string;

  @Column()
  sector: string;

  @Column({ type: 'text' })
  herramientasYPlataformas: string;

  @Column({ type: 'text' })
  etiquetas: string;

  @Column({ type: 'text' })
  aprendizaje: string;

  @Column({ type: 'text' })
  requisitosPrevios: string;

  @Column({ type: 'text' })
  descripcionDetallada: string;

  @Column('json')
  imagenDePortada: {
    url: string;
    size: number;
    width: number;
    height: number;
    format: string;
    created_at: string;
  };

  @Column()
  tituloDelModulo: string;

  @Column({ type: 'text' })
  descripcionDelModulo: string;

  @Column()
  tituloDeLaLeccion: string;

  @Column({ type: 'text' })
  descripcionDeLaLeccion: string;

  @Column({ type: 'text' })
  contenidoDeLaLeccion: string;

  @Column({ type: 'jsonb', nullable: true })
  materialAdicional: {
    url: string;
    size: number;
    created_at: string;
  }[];

  @Column({ type: 'boolean' })
  descuento: boolean;

  @Column({ type: 'boolean' })
  promociones: boolean;

  @Column({ type: 'int', nullable: true })
  porcentajeDeDescuento: number | null;

  @Column('json')
  video: {
    url: string;
    duration: number;
    size: number;
    resolution: string;
    format: string;
    width: string;
    height: string;
    created_at: string;
  };

  @Column({ type: 'boolean', default: true })
  available: boolean;
}
