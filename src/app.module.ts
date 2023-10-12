import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { SectionsModule } from './sections/sections.module';
import { Section } from './sections/sections.model';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { FilesModule } from './files/files.module';
import * as winston from 'winston';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { MailingModule } from './mailing/mailing.module';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TokenModule } from './token/token.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.${process.env.NODE}.env`
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      // password: process.env.POSTGRES_PASSWORD,
      password: 'qwe',
      database: process.env.POSTGRES_DB,
      models: [User, Section],
      autoLoadModels: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          handleExceptions: false,
          filename: `./appLogs/winston.log`,
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: false,
              prettyPrint: false,
            })),
        })

      ]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigModule) => ({
        transport: {

          host: "smtp.mail.ru",
          port: 465,
          secure: true,
          debug: false,
          logger: false,
          auth: {
            user: "sender_app_tg@mail.ru",
            pass: "46xR9jp1KKVhacDYha3Q",
            method: false
          }
        },
        
      }),
      inject: [ConfigService]
    }), ConfigModule.forRoot(), 
    UsersModule,
    SectionsModule,
    FilesModule,
    AuthModule,
    MailingModule,
    TokenModule,
  ],
  controllers: [],
  providers: [Logger],
})


 
export class AppModule { }

