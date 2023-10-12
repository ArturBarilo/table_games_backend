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
var TokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
let TokenService = TokenService_1 = class TokenService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(TokenService_1.name);
    }
    async generateTokens(userId, userEmail) {
        const payload = { userId, userEmail };
        const accessToken = await this.jwtService.signAsync(payload, { secret: constants_1.jwtConstants.secretAccess, expiresIn: '30m' });
        const refreshToken = await this.jwtService.signAsync(payload, { secret: constants_1.jwtConstants.secretRefresh, expiresIn: '10d' });
        this.logger.log('generate access/refresh tokens');
        this.saveTokens(userId, refreshToken);
        return {
            accessToken,
            refreshToken
        };
    }
    async saveTokens(userId, refreshToken) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        user.refreshToken = refreshToken;
        this.logger.log('save refresh token');
        await user.save();
    }
};
TokenService = TokenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map