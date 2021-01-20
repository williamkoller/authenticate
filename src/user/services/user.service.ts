import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    const userExists = await this.findUserByEmail({ email: data.email });
    if (userExists) {
      throw new BadGatewayException('User already registered with this email.');
    }
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
