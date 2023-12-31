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
var MailingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailingService = MailingService_1 = class MailingService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(MailingService_1.name);
    }
    async sendMail(email, activationLink) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Greeting from NestJS NodeMailer',
            text: process.env.activationURL + `${activationLink}`,
            from: {
                name: 'TGApp',
                address: "sender_app_tg@mail.ru"
            }
        });
        this.logger.log('sending mail for confirmation');
    }
};
MailingService = MailingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailingService);
exports.MailingService = MailingService;
//# sourceMappingURL=mailing.service.js.map