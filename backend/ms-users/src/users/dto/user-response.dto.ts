import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FileMetadata {
  @Expose()
  size: number;

  @Expose()
  url: string;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose()
  format: string;

  @Expose()
  mimeType: string;

  @Expose()
  created_at: string;
}

export class ImgProfile {
  @Expose()
  id: string;

  @Expose()
  fileType: string;

  @Expose()
  @Type(() => FileMetadata) // Asegúrate de que se mapee correctamente
  fileMetadata: FileMetadata;
}

export class Seller {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  about: string;

  @Expose()
  @IsOptional() // Haz que sea opcional en el DTO
  website?: string; // Opcional en el DTO

  @Expose()
  @IsOptional() // Haz que sea opcional en el DTO
  documentImg?: string; // Opcional en el DTO

  @Expose()
  @IsOptional() // Haz que sea opcional en el DTO
  paymentMethod?: string; // Opcional en el DTO
}

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullname: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => ImgProfile) // Mapea correctamente el perfil de imagen
  imgProfile: ImgProfile;

  @Expose()
  @Type(() => Seller) // Mapea correctamente el vendedor
  seller: Seller;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
