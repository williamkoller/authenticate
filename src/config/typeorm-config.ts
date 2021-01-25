import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URI,
  synchronize: true,
  entities: [User],
  useUnifiedTopology: true,
};
