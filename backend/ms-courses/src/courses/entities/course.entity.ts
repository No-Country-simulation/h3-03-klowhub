import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Multimedia } from './multimedia.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @Column({ type: 'enum', enum: ['Gratuito', 'Pago'] })
  // tipoDeCurso: string;
  @Column()
  freeContent: boolean;

  @Column({ type: 'enum', enum: ['Lección', 'Curso'] })
  contentType: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'enum', enum: ['Basico', 'Intermedio'] })
  courseDifficulty: string;

  @Column({ type: 'enum', enum: ['Appsheet', 'PowerApps'] })
  platform: string;

  @Column({ type: 'enum', enum: ['Inglés', 'Español'] })
  language: string;

  @Column({
    type: 'enum',
    enum: [
      'UX-UI',
      'Base de datos',
      'Expresiones y fórmulas',
      'Automatización',
      'Flujos de trabajo',
      'Seguridad-Accesibilidad',
      'General',
      'Acciones-Behaviour',
    ],
  })
  coreContent: string;

  // @Column({ type: 'text' })
  // content: string;

  @Column({
    type: 'enum',
    enum: [
      'Calendario',
      'Generación de PDF',
      'Reportes automáticos',
      'Chatbot(BOT)',
      'Emails',
      'SMS',
      'Notificaciones Push',
      'Generación y Escaneo QR',
      'Geolocalización',
      'OCR',
      'Machine Learning',
      'Estadísticas de uso',
      'Dashboard - Repostes y analisis',
    ],
  })
  functionalities: string;

  @Column({
    array: true,
    type: 'enum',
    enum: [
      'Industria',
      'Gestión del tiempo',
      'Gestión de proyectos',
      'Gestión de inventarios',
      'Ventas y CRM',
      'Obras y contrucción',
      'Logistica y transporte',
      'Servicios profesionales',
      'Marketing digital',
      'E-Commerce',
      'Entretenimiento y medios',
      'Seguridad y vigilancia',
      'Investigación y desarrollo',
      'Agricultura y medio ambiente',
      'Administración',
    ],
  })
  sector: string[];

  // @Column({ type: 'text', array: true })
  // learningSubjects: string[];

  @Column({
    type: 'enum',
    enum: [
      'Google Sheets',
      'Looker Studio',
      'MySQL',
      'PostgreSQL',
      'Salesforce',
      'Airtable',
      'Dropbox',
      'Box',
      'Google Analitics',
      'Zapier',
      'Wordpress',
      'Shopify',
      'WhasApp API',
      'Powe BI',
      'Twilo',
      'Trello',
      'Google Calendar',
      'Google Drive',
      'Google Maps',
      'Gestión de Usuarios',
      'Reporting avanzado',
      'Integración de datos',
      'Gestión de permisos',
      'Analisis de datos',
      'Optimización Performance',
      'Despliegue Deploy',
      'Importación - exportación de datos',
      'Firmas digitales',
      'Escaneo de documentos',
      'Monitor de automatizaciones',
      'Historial de auditoria',
      'API - Integraciones',
    ],
  })
  toolsAndPlatform: string;

  @Column({ type: 'text' })
  tags: string;
  //learningSubjects cambiarlo a array de strings
  @Column({ type: 'text', array: true })
  learningSubjects: string[];

  @Column({ type: 'text' })
  prevRequirements: string;

  @Column({ type: 'text' })
  fullDescription: string;

  //nuevo atributo
  //tabla de modulo
  //tabla de images
  //tabla de videos
  //tabla de documents
  //tabla de lesssons

  @Column('json')
  modules: {
    title: string;
    description: string;
    lessons: {
      free: boolean;
      title: string;
      description: string;
      documents: {
        url: string;
        size: number;
        mimeType: string;
        created_at: string;
      }[];
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
    }[];
  }[];

  @Column()
  link: string;

  // @Column({ type: 'jsonb', nullable: true })

  // Imagen del curso
  @Column('json')
  coverImg: {
    url: string;
    size: number;
    width: number;
    height: number;
    format: string;
    created_at: string;
  };
  //promotion puede ser null hacerlo en el DTO
  @Column('json', { nullable: true })
  promotion: {
    product: {
      id: string;
      type: string;
    };
    percentage: number;
  };

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => Multimedia, (multimedia) => multimedia.course, {
    cascade: true,
  })
  multimedia: Multimedia[];
}
