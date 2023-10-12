"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const users_model_1 = require("./users/users.model");
const sections_module_1 = require("./sections/sections.module");
const sections_model_1 = require("./sections/sections.model");
const nest_winston_1 = require("nest-winston");
const files_module_1 = require("./files/files.module");
const winston = require("winston");
const serve_static_1 = require("@nestjs/serve-static");
const auth_module_1 = require("./auth/auth.module");
const mailing_module_1 = require("./mailing/mailing.module");
const path = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const token_module_1 = require("./token/token.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.resolve(__dirname, 'static'),
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: 'qwe',
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, sections_model_1.Section],
                autoLoadModels: true,
            }),
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('MyApp', {
                            colors: true,
                            prettyPrint: true,
                        })),
                    }),
                    new winston.transports.File({
                        handleExceptions: false,
                        filename: `./appLogs/winston.log`,
                        format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('MyApp', {
                            colors: false,
                            prettyPrint: false,
                        })),
                    })
                ]
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
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
                inject: [config_1.ConfigService]
            }), config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            sections_module_1.SectionsModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            mailing_module_1.MailingModule,
            token_module_1.TokenModule,
        ],
        controllers: [],
        providers: [common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map