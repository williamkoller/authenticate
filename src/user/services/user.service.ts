import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  async findUserByEmail(isEmail: { email: string }): Promise<User> {
    const userEmail = await this.userRepository.findOne({ where: { email: isEmail.email } });
    if (!userEmail) {
      throw new NotFoundException('User not ound');
    }
    return userEmail;
  }
}
