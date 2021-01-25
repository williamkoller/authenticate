import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(data);
  }
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }
}
