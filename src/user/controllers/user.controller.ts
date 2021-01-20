import { Body, Controller, Get, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, ReturnUserDto } from '../dtos';
import { UserService } from '../services/user.service';

@Controller('user')
@Injectable()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) data: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.create(data);
    return {
      user,
      message: 'User created with successfully.',
    };
  }

  @Get('find-user-by-email')
  async findUserByEmail(@Body() isEmail: { email: string }): Promise<User> {
    return await this.userService.findUserByEmail({ email: isEmail.email });
  }
}
