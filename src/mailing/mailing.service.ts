import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailingService {

    logger: Logger
    constructor(private mailerService: MailerService) {
        this.logger = new Logger(MailingService.name)
    }

    async sendMail(email: string, activationLink: string) {

        await this.mailerService.sendMail({
            to: email,
            subject: 'Greeting from NestJS NodeMailer',
            
            text: process.env.activationURL + `${activationLink}`,
            from: {
                name: 'TGApp',
                address: "sender_app_tg@mail.ru"
            }
        })
        this.logger.log('sending mail for confirmation')
    }
}