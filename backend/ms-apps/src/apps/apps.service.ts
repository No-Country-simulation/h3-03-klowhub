import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAppDto } from './dto/create-app.dto';
import { App } from './entities/app.entity';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}

  async create(createAppDto: CreateAppDto): Promise<App> {
    try {
      const app = this.appRepository.create(createAppDto);
      return await this.appRepository.save(app);
    } catch (error) {
      throw new ConflictException(
        'Error al crear la aplicación: ' + error.message,
      );
    }
  }

  async findOne(id: string): Promise<App> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`App with ID ${id} not found`);
    }
    return app;
  }

  async findAll(): Promise<App[]> {
    try {
      return await this.appRepository.find();
    } catch (error) {
      throw new ConflictException(
        'Error al obtener las aplicaciones: ' + error.message,
      );
    }
  }
}
