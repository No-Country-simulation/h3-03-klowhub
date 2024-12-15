import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/switch-to-seller')
  async switchToSeller(
    @Param('id') id: string,
    @Body() createSellerDto: CreateSellerDto,
  ): Promise<UserResponseDto> {
    return this.usersService.switchToSeller(id, createSellerDto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll(); // Asegúrate de que retorne el DTO
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id); // Asegúrate de que retorne el DTO
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
