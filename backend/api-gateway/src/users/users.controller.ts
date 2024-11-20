import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':id')
  async obtenerUsuario(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/users/${id}`), // URL del microservicio de usuarios
    );
    return response.data;
  }

  @Get('')
  async obtenerTodosLosUsuarios() {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/users`),
    );
    return response.data;
  }
}
