import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

interface FileMetadata {
  size: number;
  url: string;
  width: number;
  height: number;
  format: string;
  mimeType: string;
  created_at: string;
}

interface ImgProfile {
  id: string;
  fileType: string;
  fileMetadata: FileMetadata;
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsObject()
  imgProfile: ImgProfile;
}
