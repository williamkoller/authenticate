import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthInput } from '../dtos/auth.input';
import { AuthType } from '../dtos/auth.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    const validPassword = compareSync(data.password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Incorrect email or password');
    }

    delete user.password;

    const token = await this.login(user);
    return {
      user,
      token,
    };
  }

  async login(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return this.jwtService.signAsync(payload);
  }
}
