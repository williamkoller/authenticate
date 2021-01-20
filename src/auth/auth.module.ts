import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/services/user.service';
import { AuthService } from './services/auth.service';

@Module({
  providers: [AuthService, UserService, UserRepository],
  exports: [UserService],
})
export class AuthModule {}
