import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm-config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
