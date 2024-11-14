import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto); // Crea una nueva instancia de User
    return await this.usersRepository.save(user); // Guarda en la base de datos
  }

  async findAll() {
    return await this.usersRepository.find(); // Devuelve todos los usuarios
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    }); // Devuelve un único usuario por ID
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto); // Actualiza el usuario
    return this.findOne(id); // Devuelve el usuario actualizado
  }

  async remove(id: number) {
    await this.usersRepository.delete(id); // Elimina el usuario
    return { deleted: true }; // Retorna una respuesta de éxito
  }
}
