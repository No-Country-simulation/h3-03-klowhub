import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

interface FileMetadata {
  size: number;
  url: string;
  width: number;
  height: number;
  format: string;
  mimeType: string;
  created_at: string;
}

interface ProfileImg {
  id: string;
  fileType: string;
  fileMetadata: FileMetadata;
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'explorer' }) // modo por defecto
  role: string; // 'explorer' o 'seller'

  @Column({
    type: 'json', // Cambia el tipo a 'json' para almacenar un objeto
    default: {
      id: 'a1ea94ba-4e95-4f63-be60-36d265dd6dc9',
      fileType: 'image',
      fileMetadata: {
        size: 0,
        url: '/temp/imgs/profile-mini.png',
        width: 60,
        height: 60,
        format: 'webp',
        mimeType: 'image/webp',
        created_at: '2024-12-04T05:47:09Z',
      },
    },
  })
  profileImg: ProfileImg;

  @OneToOne(() => Seller, (seller) => seller.user, { nullable: true })
  @JoinColumn()
  seller?: Seller;
}
