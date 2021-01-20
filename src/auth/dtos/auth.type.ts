import { User } from 'src/entities/user.entity';

export type AuthType = {
  user: User;
  token: string;
};
