import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity/project.entity';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ){}

  async createProject(data: Partial<Project>): Promise<Project>{
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async updateProject(id: number, data: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, data);
    return this.projectRepository.findOneBy({ id });
  }

  // async getProjectsByUser(userId: number): Promise<Project[]> {

  // }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
