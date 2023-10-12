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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const files_service_1 = require("../files/files.service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, filesService) {
        this.userRepository = userRepository;
        this.filesService = filesService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async createUser(dto) {
        const email = dto.email;
        const userCheck = await this.userRepository.findOne({ where: { email } });
        if (userCheck) {
            this.logger.error(`user with email: ${email} already exists`);
            throw new common_1.HttpException(`user with email: ${email} already exists`, common_1.HttpStatus.BAD_REQUEST);
        }
        dto.password = await bcrypt.hash(dto.password, 5);
        dto.activationLink = uuid.v4();
        this.logger.log('create new user');
        return this.userRepository.create(dto);
    }
    async getAllUsers() {
        this.logger.log('get all users');
        return this.userRepository.findAll();
    }
    async getOneUser(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.error(`user with id: ${id} not found`);
            throw new common_1.HttpException(`user with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        this.logger.log(`get user by id: ${id}`);
        return user;
    }
    async getOneByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            this.logger.error(`user with email: ${email} not found`);
            throw new common_1.HttpException(`user with email: ${email} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        this.logger.log(`get user by email: ${email}`);
        return user;
    }
    async deleteUser(id) {
        const user = await this.userRepository.destroy({ where: { id } });
        if (!user) {
            this.logger.error(`user with id: ${id} not found`);
            throw new common_1.HttpException(`user with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        this.logger.log(`user with id: ${id} was removed`);
        return `user with id: ${id} was removed`;
    }
    async updateUser(id, dto) {
        const userForUpdate = await this.userRepository.findOne({ where: { id } });
        if (!userForUpdate) {
            this.logger.error(`user with id: ${id} not found`);
            throw new common_1.HttpException(`user with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update(dto, { where: { id } });
        this.logger.log(`user with id: ${id} was updated`);
        return this.userRepository.findOne({ where: { id } });
    }
    async addAvatar(id, dto, avatar) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.error(`user with id: ${id} not found`);
            throw new common_1.HttpException(`user with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const fileName = await this.filesService.createFile(avatar);
        dto.avatar = fileName;
        await this.userRepository.update(dto, { where: { id } });
        this.logger.log(`add avatar for user with id:${id}`);
        return this.userRepository.findOne({ where: { id } });
    }
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map