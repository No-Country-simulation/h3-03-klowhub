import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
  ) {}

  async switchToSeller(
    userId: string,
    createSellerDto: CreateSellerDto,
  ): Promise<Omit<Seller,"user">> {
    // Verificar que el usuario existe
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cambiar el rol a 'vendor'
    user.role = 'vendor';
    await this.usersRepository.save(user);

    // Crear la entidad Seller
    const seller = this.sellersRepository.create({
      ...createSellerDto,
      user, // Asociar el usuario con el vendedor
    });
    const { user: userInsideSeller, ...savedSeller } = await this.sellersRepository.save(seller);

    return savedSeller; // Retornar el usuario actualizado
  }

  findAll() {
    return this.usersRepository.find({ relations: ['seller'] });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['seller'], // Incluye la relación con Seller
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
