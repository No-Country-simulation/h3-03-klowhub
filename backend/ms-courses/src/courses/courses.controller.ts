import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    const allCourses = await this.coursesService.findAll();
    if (!allCourses) {
      throw new NotFoundException('There are no course available');
    }
    return allCourses;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new BadRequestException('There in no course avaiable');
    }
    const singleCourse = await this.coursesService.findOne(id);
    console.log('este es el singleCourse', singleCourse);
    if (!singleCourse) {
      throw new NotFoundException('There is no a course available');
    }
    return singleCourse;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const updateCourse = await this.coursesService.update(id, updateCourseDto);
    if (!updateCourse) {
      throw new NotFoundException('There is no course to update');
    }
    return updateCourse;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
