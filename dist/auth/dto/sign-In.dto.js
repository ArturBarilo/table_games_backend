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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignInDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Should be a string' }),
    (0, class_validator_1.Length)(4, 16, { message: 'Password length should be 4-16 characters' }),
    (0, swagger_1.ApiProperty)({ example: 'gr45koj12', description: 'Usesr\'s password' }),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Incorrect email address' }),
    (0, swagger_1.ApiProperty)({ example: 'some_email@gmail.com', description: 'Usesr\'s email' }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
exports.SignInDto = SignInDto;
//# sourceMappingURL=sign-In.dto.js.map