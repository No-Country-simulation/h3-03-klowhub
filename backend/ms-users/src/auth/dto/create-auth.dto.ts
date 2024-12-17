import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordValid } from 'src/validators/password.validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Franco David' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'franco.david@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user_password' })
  @IsNotEmpty()
  @IsString()
  @IsPasswordValid()
  password: string;
}
