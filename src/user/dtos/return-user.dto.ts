import { User } from '../models/user.entity';

export class ReturnUserDto {
  user: User;
  message: string;
}
