import {
  Column,
  Entity,
  // JoinColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  // ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image, Multimedia } from './multimedia.entity';
import { CourseModule } from './course-module.entity';
import { PromotionProduct } from './promotion.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @Column({ type: 'enum', enum: ['Gratuito', 'Pago'] })
  // tipoDeCurso: string;
  @Column()
  freeCourse: boolean;

  @Column({ type: 'enum', enum: ['lesson', 'course'] })
  contentType: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'enum', enum: ['basic', 'intermediate'] })
  courseDifficulty: string;

  @Column({ type: 'enum', enum: ['appsheet', 'powerapps'] })
  platform: string;

  @Column({ type: 'enum', enum: ['english', 'spanish'] })
  language: string;

  @Column({
    type: 'enum',
    enum: [
      'ux-ui',
      'databases',
      'expressions-and-formulas',
      'automation',
      'workflows',
      'actions-behavior',
      'security-accesibility',
      'general',
    ],
  })
  coreContent: string;

  // @Column({ type: 'text' })
  // content: string;

  @Column({
    type: 'enum',
    enum: [
      'calendario',
      'generacion-de-pdf',
      'reportes-automaticos',
      'chatbot-bot',
      'emails',
      'sms',
      'notificaciones-push',
      'generacion-y-escaneo-qr',
      'geolocalizacion',
      'ocr',
      'machine-learning',
      'estadisticas-de-uso',
      'dashboard-reportes-y-analisis',
      'gestion-de-usuarios',
      'reporting-avanzado',
      'integracion-de-datos',
      'gestion-de-permisos',
      'analisis-de-datos',
      'optimizacion-performance',
      'despliegue-deploy',
      'importacion-exportacion-de-datos',
      'firmas-digitales',
      'escaneo-de-documentos',
      'monitor-de-automatizaciones',
      'historial-de-auditoria',
      'api-integraciones',
    ],
  })
  functionalities: string;

  @Column({
    array: true,
    type: 'enum',
    enum: [
      'industria',
      'gestion-del-tiempo',
      'gestion-de-proyectos',
      'gestion-de-inventarios',
      'ventas-y-crm',
      'obras-y-construccion',
      'logistica-y-transporte',
      'servicios-profesionales',
      'marketing-digital',
      'e-commerce',
      'entretenimiento-y-medios',
      'seguridad-y-vigilancia',
      'investigacion-y-desarrollo',
      'agricultura-y-medio-ambiente',
      'administracion',
    ],
  })
  sector: string[];

  @Column({
    type: 'enum',
    enum: [
      'google-sheets',
      'looker-studio',
      'mysql',
      'postgresql',
      'salesforce',
      'airtable',
      'dropbox',
      'box',
      'google-analytics',
      'zapier',
      'wordpress',
      'shopify',
      'whatsapp-api',
      'power-bi',
      'twilio',
      'trello',
      'google-calendar',
      'google-drive',
      'google-maps',
    ],
  })
  toolsAndPlatform: string;

  @Column({
    type: 'enum',
    enum: [
      'plataforma-de-cursos',
      'aplicaciones-sin-codigo',
      'desarrolladores-nocode',
      'powerapps-para-empresas',
      'appsheet-para-negocios',
      'automatizacion-de-tareas',
      'apps-de-productividad',
      'tecnologia-para-empresas',
      'herramientas-nocode',
      'creacion-de-aplicaciones',
    ],
  })
  tags: string;

  //learningSubjects cambiarlo a array de strings
  @Column({ type: 'text', array: true })
  learningSubjects: string[];

  @Column({ type: 'text' })
  prevRequirements: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column()
  link: string;

  // @Column({ type: 'jsonb', nullable: true })

  // Imagen del curso
  @Column('json')
  coverImg: Image;

  //promotion puede ser null hacerlo en el DTO
  // @Column('json', { nullable: true })
  // promotion: {
  //   product: {
  //     id: string;
  //     type: string;
  //   };
  //   percentage: number;
  // };

  @OneToOne(() => PromotionProduct)
  @JoinColumn()
  promotion: PromotionProduct;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column()
  targetAudience: string;

  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => CourseModule, (module) => module.id)
  modules: CourseModule[];

  // Relación OneToMany con Multimedia
  @OneToMany(() => Multimedia, (multimedia) => multimedia.course, {
    cascade: true, // Esto permite guardar los multimedia relacionados cuando se guarda el curso
  })
  promotionalVideo: Multimedia;
  //promotionalVideo tiene que ser de tipo video

  // @Column(() => Multimedia)
  // promotionalVideo: Multimedia;

  // @OneToMany(() => Multimedia, (multimedia) => multimedia.course, {
  //   cascade: true,
  // })
  // multimedia: Multimedia[];

  // @ManyToOne(() => Multimedia, { nullable: true, lazy: true })
  // @JoinColumn({ name: 'promotional_video_id' }) // Nombre claro en la base de datos
  // promotionalVideo: Multimedia;
}

// FALTA LA PROPIEDAD DOCUMENTS
