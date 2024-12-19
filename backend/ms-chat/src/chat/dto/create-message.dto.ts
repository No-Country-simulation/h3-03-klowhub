import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  userId: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  emotes?: Record<string, any>;
}
