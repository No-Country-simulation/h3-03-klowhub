import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { User } from './entities/user.entity';
import { Seller } from './entities/seller.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/switch-to-seller')
  async switchToSeller(
    @Param('id') id: string,
    @Body() createSellerDto: CreateSellerDto,
  ): Promise<Omit<Seller, "user">> {
    return this.usersService.switchToSeller(id, createSellerDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
