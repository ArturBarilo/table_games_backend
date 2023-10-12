import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';


@Module({
  imports: [SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true
    }),
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService]
})
export class TokenModule {}
