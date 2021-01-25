import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../models/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('User exists with email.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const userSaved = await this.save({
      email: data.email,
      username: data.username,
      password: hash,
    });
    return userSaved;
  }

  async findUserByEmail(email: string): Promise<User> {
    const emailUser = await this.findOne({ email });
    if (!emailUser) {
      throw new NotFoundException('User not found.');
    }
    return emailUser;
  }

  async findUserById(id: string): Promise<User> {
    const userId = await this.findOne({ where: { _id: id } });
    delete userId.password;
    if (!userId) {
      throw new BadRequestException('User not found.');
    }
    return userId;
  }
}
