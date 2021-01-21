import { Body, Controller, Get, Injectable, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('find-user-by-email')
  async findUserByEmail(@Body() email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-user-by-id')
  async findUserById(@Body() id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }
}
