import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  userId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  emotes?: Record<string, any>;
}
