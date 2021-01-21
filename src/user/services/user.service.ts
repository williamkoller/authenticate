import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Connection } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    private readonly connection: Connection,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findUserById(id);
  }
}
