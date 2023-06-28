import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole, UserStatus } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;

  userName: string;

  email: string;

  password: string;

  refreshToken: string;

  refreshTokenExp: string;

  status: UserStatus;

  role: UserRole;

  planId: string;
}
