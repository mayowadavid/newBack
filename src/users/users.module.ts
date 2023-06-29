import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlanService } from 'src/plan/plan.service';
import { Plan } from 'src/plan/entities/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Plan]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, PlanService],
})
export class UsersModule {}
