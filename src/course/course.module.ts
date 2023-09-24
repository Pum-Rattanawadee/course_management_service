import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity'
import { StorageModule } from 'src/storage/storage.module';
import { Services } from 'src/util/type';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [StorageModule,TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [{
    provide: Services.IMAGE,
    useClass: CourseService,
  },
  {
    provide: Services.STORAGE,
    useClass: StorageService,
  },],
})
export class CourseModule {}
