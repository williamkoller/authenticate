import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../models/user.entity';
import { EntityRepository, MongoRepository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {
  async createUser(data: CreateUserDto): Promise<User> {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const userSaved = await this.save({
      email: data.email,
      username: data.username,
      password: hash,
    });
    return userSaved;
  }

  async findUserByEmail(email: string): Promise<User> {
    const emailUser = await this.findOne({ where: email });
    if (!emailUser) {
      throw new NotFoundException('User not found.');
    }
    return emailUser;
  }
}
