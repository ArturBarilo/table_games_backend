import { MailerService } from "@nestjs-modules/mailer";
import { Logger } from "@nestjs/common";
export declare class MailingService {
    private mailerService;
    logger: Logger;
    constructor(mailerService: MailerService);
    sendMail(email: string, activationLink: string): Promise<void>;
}
