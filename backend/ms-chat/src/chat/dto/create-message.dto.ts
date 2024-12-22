import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  emotes?: Record<string, any>;
}
