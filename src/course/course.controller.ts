import { Controller, Get, Post, Res, Body, UseGuards, HttpStatus,Request } from '@nestjs/common';
import { CourseService } from './course.service';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/interface/user.interface'
import { RoleGuard } from 'src/auth/role/role.guard';
import { CourseDto, transfromCoursesDto } from './dto/course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const courses = await this.courseService.findAll()
    return transfromCoursesDto(courses)
  }

  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async create(@Request() req: any,@Res() res, @Body() courseDto: CourseDto) {
    try {
      courseDto.instructorId = req.user.id
      const response = await this.courseService.create(courseDto)
      return res.status(HttpStatus.OK).json({ response })
    } catch (error) {
        res.status(error.status).json(error.response)
    }
  }
}
