import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiResponse({ status: 201, description: 'El usuario ha sido registrado.' })
  @ApiResponse({ status: 400, description: 'Error en los datos de entrada.' })
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
