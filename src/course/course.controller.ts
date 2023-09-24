import { Controller, Get, Post, Res, Body, UseGuards, HttpStatus,Request, Query, UseInterceptors, UploadedFile, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/interface/user.interface'
import { RoleGuard } from 'src/auth/role/role.guard';
import { CourseDto, transfromCoursesDto } from './dto/course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

import { Services } from 'src/util/type';
import { v4 as uuidv4 } from 'uuid';
import { ImageOptionsDto } from './util/dto/ImageOptionsDto';
import { ImageDTOValidationPipe } from './util/pipes/ImageDTOValidationPipe';

@Controller('course')
export class CourseController {
  constructor( @Inject(Services.IMAGE) private readonly courseService: CourseService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() courseDto: CourseDto) {
    console.log(courseDto)
    const courses = await this.courseService.findByFilter(courseDto)
    return transfromCoursesDto(courses)
  }

  @UseGuards(AuthGuard)
  @Get("search")
  async findByFilter(@Query() courseDto: CourseDto) {
    console.log(courseDto)
    const courses = await this.courseService.findByFilter(courseDto)
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
      return  res.status(error.status).json(error.response)
    }
  }


@Post('upload')
@UseInterceptors(FileInterceptor('file'))
@UsePipes(new ValidationPipe({ transform: true }), ImageDTOValidationPipe)
async createImage(
  @UploadedFile() file: Express.Multer.File,
  @Res() res,
) {
 
  try {

    const imageOptions: ImageOptionsDto = {
      isNSFW :true,
      isProtected: false,
      password: null
    }

    const key = uuidv4().split('-')[0];
    const fileName = await this.courseService.upload(key, file,imageOptions);
   return   res.status(HttpStatus.OK).json( fileName )
  } catch (err) {
    return res.status(err.status).json(err.response)
  }
}
}
