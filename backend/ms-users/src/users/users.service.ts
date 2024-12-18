import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
  ) {}

  async becomeSeller(
    userId: string,
    createSellerDto: CreateSellerDto,
  ): Promise<UserResponseDto> {
    // Verificar que el usuario existe
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['seller'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar si el rol ya es 'vendor'
    if (user.role === 'vendor') {
      throw new Error('User is already a vendor'); // Lanza una excepción si ya es vendedor
    }

    // Cambiar el rol a 'vendor'
    user.role = 'vendor';
    await this.usersRepository.save(user);

    // Crear la entidad Seller
    const seller = this.sellersRepository.create({
      ...createSellerDto,
      user, // Asociar el usuario con el vendedor
    });
    await this.sellersRepository.save(seller);

    const userSeller = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['seller'], // Asegúrate de incluir las relaciones necesarias
    });
    if (!userSeller) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto(userSeller);
  }
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find({ relations: ['seller'] });
    console.log('USERS', users);
    return users.map(
      (user) =>
        new UserResponseDto({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          profileImg: user.profileImg, // Incluye profileImg
          seller: user.seller,
        }),
    ); // Mapea cada usuario al DTO
  }

  /*   async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['seller'], // Incluye la relación con Seller
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log('USER', user);
    return new UserResponseDto(user);
  } */

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['seller'], // Asegúrate de incluir las relaciones necesarias
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImg: user.profileImg, // Incluye profileImg
      seller: user.seller, // Incluye seller
    });
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
