import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @IsString({ each: true })
  members: string[];

  @IsEnum(['private', 'group'])
  type: 'private' | 'group';

  @IsOptional()
  courseId?: number;
}
