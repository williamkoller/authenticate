import { User } from '../../user/models/user.entity';

export type AuthType = {
  user: User;
  token: string;
};
