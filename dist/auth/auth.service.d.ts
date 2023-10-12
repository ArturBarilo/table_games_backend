import { Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-In.dto';
import { CreateUserDto } from 'src/users/dto/craete-user.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/users.model';
import { MailingService } from 'src/mailing/mailing.service';
import { Tokens } from '../token/dto/tokens.dto';
export declare class AuthService {
    private userRepository;
    private usersService;
    private tokenService;
    private mailingService;
    logger: Logger;
    constructor(userRepository: typeof User, usersService: UsersService, tokenService: TokenService, mailingService: MailingService);
    signIn(dto: SignInDto): Promise<Tokens>;
    signUp(dto: CreateUserDto): Promise<{
        user: User;
        tokens: Tokens;
    }>;
    activate(activationLink: string): Promise<User>;
}
