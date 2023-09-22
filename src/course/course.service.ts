import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseDto, transformCourseEntity } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(
      @InjectRepository(Course)
      private courseRepository: Repository<Course>,
    ) {}
    
    async findAll(): Promise<Course[]> {
      return await this.courseRepository.find({ relations: ["instructor"]});
    }

    async findByFilter(courseDto: CourseDto): Promise<Course[]> {
      let findOption: FindOptionsWhere<Course>
      if (courseDto.name) {
        findOption = { "name": Like(`%${courseDto.name}%`) } 
      }
      if (courseDto.startTime) {
        findOption = { "startTime": courseDto.startTime }
      }

      return await this.courseRepository.find({ where: findOption, relations: ["instructor"]});
    }

    async create(courseDto: CourseDto): Promise<Course> {
      const course:Course = transformCourseEntity(courseDto)
      return await this.courseRepository.save(course)
    }
}
