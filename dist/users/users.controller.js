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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("./users.model");
const common_2 = require("@nestjs/common");
const add_avatar_dto_1 = require("./dto/add-avatar.dto");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAll() {
        return this.usersService.getAllUsers();
    }
    getOne(id) {
        return this.usersService.getOneUser(id);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
    updateUser(updateDto, id) {
        return this.usersService.updateUser(id, updateDto);
    }
    addAvatar(id, avatarDto, avatar) {
        return this.usersService.addAvatar(id, avatarDto, avatar);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one user by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User, description: 'Get user by id' }),
    (0, swagger_1.ApiResponse)({ status: 404, type: common_2.HttpException, description: 'User not found by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by id' }),
    (0, swagger_1.ApiResponse)({ status: 404, type: common_2.HttpException, description: 'User not found by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: String, description: 'User was deleted by id' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User, description: 'User was updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, type: common_2.HttpException, description: 'User not found by id' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add avatar' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User, description: 'Add avatar for user' }),
    (0, swagger_1.ApiResponse)({ status: 404, type: common_2.HttpException, description: 'User not found by id' }),
    (0, common_1.Patch)('avatar/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_avatar_dto_1.AddAvatarDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAvatar", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map