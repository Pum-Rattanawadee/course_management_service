import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseDto, transformCourseEntity } from './dto/course.dto';
import { IStorageService } from 'src/storage/storage';
import { ImageOptionsType, Services } from 'src/util/type';

@Injectable()
export class CourseService {
    constructor(
      @InjectRepository(Course)
      private courseRepository: Repository<Course>,
      @Inject(Services.STORAGE) private readonly storageService: IStorageService,
    ) {}
    
    async findAll(): Promise<Course[]> {
      return await this.courseRepository.find({ relations: ["instructor"]});
    }

    async findByFilter(courseDto: CourseDto): Promise<Course[]> {
      console.log(courseDto)
      console.log(courseDto.name)
      let findOption: FindOptionsWhere<Course>
      if (courseDto.name) {
        findOption = {...findOption, "name": Like(`%${courseDto.name}%`) } 
      }
      if (courseDto.startTime) {
        findOption = {...findOption, "startTime": courseDto.startTime }
      }
      console.log(findOption)

      return await this.courseRepository.find({ where: findOption, relations: ["instructor"]});
    }

    async create(courseDto: CourseDto): Promise<Course> {
      const course:Course = transformCourseEntity(courseDto)
      return await this.courseRepository.save(course)
    }

    async upload(
      key: string,
      file: Express.Multer.File,
      imageOptions: ImageOptionsType,
    ): Promise<string> {
      await this.storageService.upload(key, file, imageOptions);
      return `https://publicfile.sgp1.cdn.digitaloceanspaces.com/${key}`;
    }
  
}
