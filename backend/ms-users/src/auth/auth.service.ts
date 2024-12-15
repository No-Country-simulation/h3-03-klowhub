import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    createAuthDto: CreateAuthDto,
  ): Promise<Partial<UserResponseDto>> {
    const { email, password } = createAuthDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
      relations: ['seller'],
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword);
    const user = this.userRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return new UserResponseDto(savedUser);
  }

  async login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ accesToken: string; user: UserResponseDto }> {
    const { email, password } = loginAuthDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['seller'],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    const accesToken = this.jwtService.sign(payload);

    return {
      accesToken,
      user: new UserResponseDto({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        imgProfile: user.imgProfile, // Incluye imgProfile
        seller: user.seller,
      }),
    }; // Retornar el usuario sin la contraseña
  }
}
