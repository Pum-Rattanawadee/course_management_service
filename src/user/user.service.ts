import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByUsernameAndPassword(username: string, password: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
          "username": username,
          "password": password
      }
  })
  }
}
