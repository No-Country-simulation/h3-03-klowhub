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

  @Column({ type: 'boolean', name: 'freeCourse' })
  freeCourse: boolean;

  @Column({ type: 'simple-array', name: 'contentType' }) // Cambiado a simple-array
  contentType: string[];

  @Column({ type: 'text', name: 'shortDescription' })
  shortDescription: string;

  @Column({ type: 'simple-array', name: 'courseDifficulty' }) // Cambiado a simple-array
  courseDifficulty: string[];

  @Column({ type: 'simple-array', name: 'platform' }) // Cambiado a simple-array
  platform: string[];

  @Column({ type: 'simple-array', name: 'language' }) // Cambiado a simple-array
  language: string[];

  @Column({ type: 'simple-array', name: 'coreContent', nullable: true }) // Cambiado a simple-array
  coreContent: string[];

  @Column({ type: 'simple-array', name: 'functionalities', nullable: true }) // Cambiado a simple-array
  functionalities: string[];

  @Column({ type: 'simple-array', name: 'sector', nullable: true }) // Cambiado a simple-array
  sector: string[];

  @Column({ type: 'simple-array', name: 'toolsAndPlatform', nullable: true }) // Cambiado a simple-array
  toolsAndPlatforms: string[];

  @Column({ type: 'simple-array', name: 'tags', nullable: true }) // Cambiado a simple-array
  tags: string[];

  @Column({ type: 'simple-array', name: 'learningSubjects' }) // Cambiado a simple-array
  learningSubjects: string[];

  @Column({ type: 'text', name: 'prevRequirements' })
  prevRequirements: string;

  @Column({ type: 'text', name: 'fullDescription' })
  fullDescription: string;

  //@Column({ type: 'text', name: 'coverImg' }) // Cambiado a texto para imágenes
  // coverImg: string;
  // @ManyToOne(() => Multimedia)
  // coverImg: Multimedia;
  @ManyToOne(() => Multimedia, (multimedia) => multimedia.course)
  @JoinColumn()
  coverImg: Multimedia;

  @Column('jsonb', { name: 'promotion', nullable: true }) // Cambiado a simple-array
  promotion: object;

  @Column({ type: 'boolean', default: true, name: 'available' })
  available: boolean;

  @Column({ type: 'text', name: 'targetAudience' })
  targetAudience: string;

  @Column({ type: 'decimal', name: 'price' })
  price: number;

  @Column({ type: 'simple-array', name: 'promotionalVideo', nullable: true })
  promotionalVideo: string[];

  @OneToMany(() => CourseModule, (module) => module.course, { cascade: true })
  modules: CourseModule[];

  @OneToMany(() => Multimedia, (multimedia) => multimedia.course, {
    cascade: true,
  })
  multimedia: Multimedia[];
}
