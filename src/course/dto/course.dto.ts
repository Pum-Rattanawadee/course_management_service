import { IsDate, IsNotEmpty, IsString, isNumber } from 'class-validator'
import { Course } from '../entities/course.entity'
import {v4 as uuidv4} from 'uuid';
import { UserDto, transformUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

export class CourseDto {
    @IsString()
    id: string

    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    category: string

    @IsString()
    image: string

    @IsString()
    subject: string

    @IsDate()
    startTime: Date

    @IsDate()
    endTime: Date

    numberOfStudent: number
    creditPrice: number
    nonCreditPrice: number
    instructorId: string
    instructor: User
    instructorInfo: UserDto
}

export const transformCourseEntity = (courseDto: CourseDto) => {
    let courseId = courseDto.id 
    if (!courseId) {
        courseId = uuidv4()
    }

    let course = new Course()
    course.id= courseId
    course.name= courseDto.name
    course.description= courseDto.description
    course.category= courseDto.category
    course.image= courseDto.image
    course.subject= courseDto.subject
    course.startTime= courseDto.startTime
    course.endTime= courseDto.endTime
    course.numberOfStudent= courseDto.numberOfStudent
    course.creditPrice= courseDto.creditPrice
    course.nonCreditPrice= courseDto.nonCreditPrice
    course.instructorId= courseDto.instructorId
    return course
}

export const transfromCoursesDto = (courses: Course[]) => {
    let coursesDto = []
    courses.forEach(course => {
        let courseDto = new CourseDto()
        courseDto.id = course.id
        courseDto.name = course.name
        courseDto.description = course.description
        courseDto.category = course.category
        courseDto.image = course.image
        courseDto.subject = course.subject
        courseDto.startTime = course.startTime
        courseDto.endTime =  course.endTime
        courseDto.numberOfStudent = course.numberOfStudent
        courseDto.creditPrice = course.creditPrice
        courseDto.nonCreditPrice = course.nonCreditPrice
        courseDto.instructorInfo = transformUserDto(course.instructor)

        coursesDto.push(courseDto)
    });

    return coursesDto
}