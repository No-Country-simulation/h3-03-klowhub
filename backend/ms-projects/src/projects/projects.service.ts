import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ){}

  async createProject(projectData: CreateProjectDto, userId: string): Promise<Project> {
    // Validar y transformar los datos si es necesario
    const { assets, ...rest } = projectData;

    // Convertir 'assets' de string a object[] si es necesario
    const transformedAssets = assets || [];

    // Crear el nuevo proyecto
    const newProject = this.projectRepository.create({
      ...rest,
      assets: transformedAssets,
      userId,
    });
    // Guardar en la base de datos
    return await this.projectRepository.save(newProject);
  }


  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async updateProject(id: number, data: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, data);
    return this.projectRepository.findOneBy({ id });
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({ where: { userId } });

    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No se encontraron proyectos para el usuario con ID ${userId}`);
    }

    return projects;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
