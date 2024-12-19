import { IsArray, IsString } from 'class-validator';

export class AddMembersDto {
  @IsArray()
  @IsString({ each: true })
  members: string[];
}
