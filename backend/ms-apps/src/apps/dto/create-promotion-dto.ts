import { IsString, IsNumber } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  type: string;

  @IsString()
  promoted: string;

  @IsNumber()
  percentage: number;
}
