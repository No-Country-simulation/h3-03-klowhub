import { HttpService } from '@nestjs/axios';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller('courses')
export class CoursesController {
  constructor(private readonly httpService: HttpService) {}
  @Post()
  async createCourse(@Body() createCourseDto: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://ms-courses:3003/courses',
          createCourseDto,
        ),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException(error.response.data.message);
      }
      throw new BadRequestException();
    }
  }
}
