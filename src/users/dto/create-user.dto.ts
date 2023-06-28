import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  userName: string;

  email: string;

  password: string;

  refreshToken: string;

  refreshTokenExp: string;

  status: UserStatus;

  role: UserRole;

  planId: string;
}
