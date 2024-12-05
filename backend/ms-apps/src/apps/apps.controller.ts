import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { AppsService } from './apps.service';
import { App } from './entities/app.entity';

@Controller('apps')
export class AppsController {
  constructor(private readonly appService: AppsService) {}

  @Post()
  async create(@Body() createAppDto: CreateAppDto): Promise<App> {
    return this.appService.create(createAppDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<App> {
    return this.appService.findOne(id);
  }

  @Get()
  async findAll(): Promise<App[]> {
    return this.appService.findAll();
  }
}
