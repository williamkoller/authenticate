import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]), forwardRef(() => UserModule), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
