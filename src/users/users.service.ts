import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, userName, role } = createUserDto;

    if (email?.length == 0 || email == null) {
      throw new BadRequestException(`email can't be empty`);
    } else if (userName?.length == 0 || userName == null) {
      throw new BadRequestException(`user name can't be empty`);
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const uniqueName = await this.userRepository.findOne({
      where: { userName },
    });
    if (user !== null || user?.email == email) {
      throw new BadRequestException('user already exist');
    } else if (uniqueName !== undefined && uniqueName?.userName) {
      throw new BadRequestException('username already exist');
    } else {
      createUserDto.password = await this.getPasswordHash(
        createUserDto.password,
      );

      if (
        role !== 'Administrator' &&
        (createUserDto.planId == null || undefined)
      )
        throw new BadRequestException('you need to assign user an account');

      const senditan = await this.userRepository.create(createUserDto);
      const result = await this.userRepository.save(senditan);
      const signUpToken = await this.getJwtToken({
        role,
        userId: result.id,
      });
      result.refreshToken = signUpToken;
      return result;
    }
  }

  async validateUser({ userId }): Promise<any> {
    const id = userId;
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }

  public async getJwtToken(dataToken): Promise<string> {
    const payload = {
      ...dataToken,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(userId: string, role: string): Promise<any> {
    const payload = {
      userId,
      role,
    };
    const token = await this.jwtService.signAsync(payload);
    const userDataToUpdate = {
      refreshToken: token,
      refreshTokenExp: moment().day(10).format('YYYY/MM/DD'),
    };
    await this.userRepository.update(userId, userDataToUpdate);
    return userDataToUpdate;
  }

  async loginUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, userName, password } = createUserDto;

    let user;
    if (email !== null && email !== undefined && email.length > 0) {
      user = await this.userRepository.findOne({
        relations: [],
        where: {
          email,
        },
      });
    } else if (
      userName !== null &&
      userName !== undefined &&
      userName.length > 0
    ) {
      user = await this.userRepository.findOne({
        relations: [],
        where: {
          userName,
        },
      });
    } else {
      throw new BadRequestException(`username or email can't be empty`);
    }

    if (user == null) {
      throw new BadRequestException('wrong username or email');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('invalid password');
    }
    const userId = user.id;
    const role = user.role;
    const { refreshToken, refreshTokenExp } = await this.getRefreshToken(
      userId,
      role,
    );

    const result = { ...user, refreshToken, refreshTokenExp };

    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['plan'],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateUserDto);
    value.password = await this.getPasswordHash(value.password);
    const result = { ...userToUpdate, ...value };
    return this.userRepository.save(result);
  }

  async remove(id: string) {
    const removeUser: User = await this.userRepository.findOne({
      where: { id },
    });
    removeUser.plan = null;
    const result = await this.userRepository.save(removeUser);
    await this.userRepository.remove(result);
    return removeUser;
  }
}
