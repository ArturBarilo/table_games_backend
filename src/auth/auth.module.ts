import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../token/constants';
import { User } from 'src/users/users.model';
import { TokenModule } from 'src/token/token.module';
import { MailingModule } from 'src/mailing/mailing.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User]),
    MailingModule,
    UsersModule,
    TokenModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretAccess,
      signOptions: { expiresIn: '30m' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
