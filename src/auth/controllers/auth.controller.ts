import { Body, Controller, Post } from '@nestjs/common';
import { AuthInput } from '../dtos/auth.input';
import { AuthType } from '../dtos/auth.type';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }
}
