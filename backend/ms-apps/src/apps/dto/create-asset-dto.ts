import { IsString, IsJSON } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  fileType: string;

  @IsJSON()
  fileMetadata: object;
}
