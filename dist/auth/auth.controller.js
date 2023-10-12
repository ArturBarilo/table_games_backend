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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const sign_In_dto_1 = require("./dto/sign-In.dto");
const auth_guard_1 = require("./auth.guard");
const craete_user_dto_1 = require("../users/dto/craete-user.dto");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const userFromRequest_dto_1 = require("./dto/userFromRequest.dto");
const tokens_dto_1 = require("../token/dto/tokens.dto");
const payload_dto_1 = require("../token/dto/payload.dto");
const successfulRegistration_dto_1 = require("./dto/successfulRegistration.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    getProfile(req) {
        return req.user;
    }
    async signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    activate(activationLink) {
        return this.authService.activate(activationLink);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User authorization' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tokens_dto_1.Tokens, description: 'Generate access/refresh tokens' }),
    (0, swagger_1.ApiResponse)({ status: 404, type: common_1.HttpException, description: 'Failed password check' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_In_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting user data after authorization' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payload_dto_1.Payload, description: 'Get user payload' }),
    (0, swagger_1.ApiResponse)({ status: 401, type: common_1.HttpException, description: 'Sending an incorrect or expired token' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", userFromRequest_dto_1.UserFreomRequest)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration new user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: successfulRegistration_dto_1.successfulRegistration, description: 'New user was created and generate access/refresh tokens' }),
    (0, swagger_1.ApiResponse)({ status: 400, type: common_1.HttpException, description: 'User with this email already exists' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [craete_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Email confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User, description: 'Email is confirmed' }),
    (0, swagger_1.ApiResponse)({ status: 400, type: common_1.HttpException, description: 'Incorrect activation link or email already confirmed' }),
    (0, common_1.Get)('activation/:activationLink'),
    __param(0, (0, common_1.Param)('activationLink')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map