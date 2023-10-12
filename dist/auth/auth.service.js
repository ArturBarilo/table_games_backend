"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("../token/token.service");
const users_model_1 = require("../users/users.model");
const mailing_service_1 = require("../mailing/mailing.service");
const sequelize_1 = require("@nestjs/sequelize");
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, usersService, tokenService, mailingService) {
        this.userRepository = userRepository;
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.mailingService = mailingService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signIn(dto) {
        const email = dto.email;
        const user = await this.usersService.getOneByEmail(email);
        const comparePassword = await bcrypt.compare(dto.password, user.password);
        if (!comparePassword) {
            this.logger.error('failed compare passwords');
            throw new common_1.UnauthorizedException();
        }
        this.logger.log('successful login');
        return this.tokenService.generateTokens(user.id, user.email);
    }
    async signUp(dto) {
        const user = await this.usersService.createUser(dto);
        const tokens = await this.tokenService.generateTokens(user.id, user.email);
        await this.mailingService.sendMail(user.email, user.activationLink);
        this.logger.log('successful registration');
        return { user, tokens };
    }
    async activate(activationLink) {
        const user = await this.userRepository.findOne({ where: { activationLink: activationLink } });
        if (!user) {
            this.logger.error('incorrect URL for activation');
            throw new common_1.HttpException(`incorrect URL for activation`, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (user.isActivated === true) {
            this.logger.error('user already activated');
            throw new common_1.HttpException(`user already activated`, common_1.HttpStatus.BAD_REQUEST);
        }
        user.isActivated = true;
        user.role = 'authorized user';
        await user.save();
        this.logger.log('user successfully activated');
        return this.userRepository.findOne({ where: { activationLink: activationLink } });
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        token_service_1.TokenService,
        mailing_service_1.MailingService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map