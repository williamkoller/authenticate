import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.create(data);
    await validateOrReject(data);
    const userSaved = await this.save(user);
    delete userSaved.password;
    if (!userSaved) {
      throw new InternalServerErrorException('Error creating a user.');
    }
    return userSaved;
  }

  async findUserByEmail(email: string): Promise<User> {
    const emailUser = await this.findOne({ where: email });
    if (!emailUser) {
      throw new NotFoundException('User not found.');
    }
    return emailUser;
  }

  async findUserById(id: string): Promise<User> {
    const userId = await this.findOne({ where: id });
    delete userId.password;
    if (!userId) {
      throw new BadRequestException('User not found.');
    }
    return userId;
  }
}
