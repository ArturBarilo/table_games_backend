import { HttpException, HttpStatus, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-In.dto';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/craete-user.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/users.model';
import { MailingService } from 'src/mailing/mailing.service';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from '../token/dto/tokens.dto'




@Injectable()
export class AuthService {

    logger: Logger

    constructor(@InjectModel(User) private userRepository: typeof User,
        private usersService: UsersService,
        private tokenService: TokenService,
        private mailingService: MailingService
    ) {
        this.logger = new Logger(AuthService.name)
    }

    async signIn(dto: SignInDto): Promise<Tokens> {

        const email: string = dto.email
        const user: User = await this.usersService.getOneByEmail(email);
        const comparePassword: boolean = await bcrypt.compare(dto.password, user.password);

        if (!comparePassword) {
            this.logger.error('failed compare passwords')
            throw new UnauthorizedException();
        }
        
        this.logger.log('successful login')
        return this.tokenService.generateTokens(user.id, user.email)
    }


    async signUp(dto: CreateUserDto): Promise<{ user: User, tokens: Tokens }> {
        const user: User = await this.usersService.createUser(dto);

        const tokens: Tokens = await this.tokenService.generateTokens(user.id, user.email)
        await this.mailingService.sendMail(user.email, user.activationLink)
        this.logger.log('successful registration')
        return { user, tokens }

    }

    async activate(activationLink: string): Promise<User> {
        const user: User = await this.userRepository.findOne({ where: { activationLink: activationLink } })

        if (!user) {
            this.logger.error('incorrect URL for activation')
            throw new HttpException(`incorrect URL for activation`, HttpStatus.BAD_REQUEST)
        } else if (user.isActivated === true) {
            this.logger.error('user already activated')
            throw new HttpException(`user already activated`, HttpStatus.BAD_REQUEST)
        }

        user.isActivated = true
        user.role = 'authorized user'
        await user.save()
        this.logger.log('user successfully activated')
        return this.userRepository.findOne({ where: { activationLink: activationLink } })
    }

}
