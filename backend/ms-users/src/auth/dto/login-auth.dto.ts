import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsPasswordValid } from 'src/validators/password.validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'franco.david@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user_password' })
  @IsNotEmpty()
  // @IsPasswordValid()
  password: string;
}
