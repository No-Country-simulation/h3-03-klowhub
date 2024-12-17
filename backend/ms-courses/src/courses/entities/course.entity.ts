import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModule } from './course-module.entity';
import { Multimedia } from './multimedia.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // userId: string;

  @Column()
  title: string;

  @Column({ type: 'boolean', name: 'freeCourse', nullable: false })
  freeCourse: boolean;

  // @Column({ type: 'jsonb', name: 'promotionalVideo', nullable: true })
  // promotionalVideo: object;

  @Column({ type: 'jsonb', name: 'contentType', nullable: false }) // Cambiado a simple-array
  contentType: string[];

  @Column({ type: 'jsonb', name: 'shortDescription', nullable: false })
  shortDescription: string;

  @Column({ type: 'jsonb', name: 'courseDifficulty', nullable: false }) // Cambiado a simple-array
  courseDifficulty: string[];

  @Column({ type: 'jsonb', name: 'platform', nullable: false }) // Cambiado a simple-array
  platform: string[];

  @Column({ type: 'jsonb', name: 'language', nullable: false }) // Cambiado a simple-array
  language: string[];

  @Column({ type: 'jsonb', name: 'coreContent', nullable: false }) // Cambiado a simple-array
  coreContent: string[];

  @Column({ type: 'jsonb', name: 'functionalities', nullable: false }) // Cambiado a simple-array
  functionalities: string[];

  @Column({ type: 'jsonb', name: 'sector', nullable: false }) // Cambiado a simple-array
  sector: string[];

  @Column({ type: 'jsonb', name: 'toolsAndPlatform', nullable: false }) // Cambiado a simple-array
  toolsAndPlatforms: string[];

  @Column({ type: 'jsonb', name: 'tags', nullable: false }) // Cambiado a simple-array
  tags: string[];

  @Column({ type: 'jsonb', name: 'learningSubjects', nullable: false }) // Cambiado a simple-array
  learningSubjects: string[];

  @Column({ type: 'jsonb', name: 'prevRequirements', nullable: false })
  prevRequirements: string[];

  @Column({ type: 'text', name: 'fullDescription', nullable: false })
  fullDescription: string;

  //@Column({ type: 'text', name: 'coverImg' }) // Cambiado a texto para imágenes
  // coverImg: string;
  // @ManyToOne(() => Multimedia)
  // coverImg: Multimedia;
  @ManyToOne(() => Multimedia, (multimedia) => multimedia.course)
  @JoinColumn()
  coverImg: Multimedia;

  @Column({ type: 'jsonb', name: 'promotion', nullable: true }) // Cambiado a simple-array
  promotion: object;

  @Column({
    type: 'boolean',
    default: true,
    name: 'available',
    nullable: false,
  })
  available: boolean;

  @Column({ type: 'text', name: 'targetAudience', nullable: false })
  targetAudience: string[];

  @Column({ type: 'decimal', name: 'price', nullable: false })
  price: number;

  @Column({ type: 'jsonb', name: 'courseIncludes', nullable: false })
  courseIncludes: string[];

  @Column({ type: 'jsonb', name: 'promotionalVideo', nullable: true })
  promotionalVideo: object;

  @OneToMany(() => CourseModule, (module) => module.course, { cascade: true })
  modules: CourseModule[];

  //para recibir id
  // @Column()
  // userId: number;

  // @ManyToOne(() => User, (user) => user.courses)
  // @JoinColumn() // No necesitas especificar el nombre de la columna si sigues la convención
  // user: User;

  @OneToMany(() => Multimedia, (multimedia) => multimedia.course)
  multimedia: Multimedia[];
}
