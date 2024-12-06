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
import {
  CoreContent,
  Functionalities,
  Sector,
  Tags,
  ToolsAndPlatform,
} from '../enums/global-enum';

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
    enum: CoreContent,
  })
  coreContent: CoreContent;

  // @Column({ type: 'text' })
  // content: string;
  @Column({
    type: 'enum',
    enum: Functionalities,
  })
  functionalities: Functionalities;

  @Column({
    type: 'enum',
    enum: Sector,
  })
  sector: Sector;

  @Column({
    type: 'enum',
    enum: ToolsAndPlatform,
  })
  toolsAndPlatform: ToolsAndPlatform;

  @Column({
    type: 'enum',
    enum: Tags,
  })
  tags: Tags;

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
