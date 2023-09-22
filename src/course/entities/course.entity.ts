import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false, length: 150})
  name: string;

  @Column({nullable: false, length: 500})
  description: string;

  @Column({nullable: false, length: 50})
  category: string

  @Column({nullable: false, length: 250})
  image: string

  @Column({nullable: false, length: 50})
  subject: string

  @Column({nullable: false, type: 'timestamp'})
  startTime: Date

  @Column({nullable: false, type: 'timestamp'})
  endTime: Date

  @Column({nullable: false})
  numberOfStudent: number

  @Column()
  creditPrice: number

  @Column()
  nonCreditPrice: number

  @Column()
  instructorId: string

  @ManyToOne(type => User) @JoinColumn() 
  instructor: User;
}