import { Course } from 'src/course/entities/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false, length: 50})
  firstName: string;

  @Column({nullable: false, length: 50})
  lastName: string;

  @Column({nullable: false, length: 50})
  username: string

  @Column({nullable: false, length: 100})
  password: string

  @Column({length: 200})
  image: string

  @Column({length: 20})
  role: string
}